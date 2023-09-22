import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "./gpt";
export async function searchYoutube(query: string) {
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(
      query
    )}&type=video&key=${process.env.YOUTUBE_API_KEY}`
  );
  if (!data) {
    console.error("No data from youtube");
    return null;
  }

  const { items } = data;
  if (!items) {
    console.error("No items from youtube");
    return null;
  }
  return items[0].id.videoId;
}

export async function getTransript(videoId: string) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });
    let transcript = "";
    for (let i = 0; i < transcript_arr.length; i++) {
      transcript += transcript_arr[i].text + " ";
    }

    return transcript.replaceAll("\n", " ");
  } catch (error) {
    return "";
  }
}

export async function getQuestionsFromTranscript(
  transcript: string,
  course_title: string
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  const questions: Question[] = await strict_output(
    "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words",
    new Array(5).fill(
      `You are to generate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript}`
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    }
  );
  return questions;
}
