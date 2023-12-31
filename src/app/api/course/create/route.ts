import { NextResponse } from "next/server";
import { createCorseSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { prisma } from "@/lib/db";
// /api/course/create
export async function POST(req: Request, res: Response) {
  try {
    // const session = await getAuthSession();
    // if (!session?.user) {
    //   return new NextResponse("unauthorised", { status: 401 });
    // }
    const body = await req.json();
    console.log(body);
    const { title, units } = createCorseSchema.parse(body);
    const { userId } = body;
    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];

    let output_units: outputUnits = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educationalvideo for each chapter. Each query should give an educational informative course in youtube.`
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      }
    );

    const course = await prisma.course.create({
      data: {
        name: title,
        userId: userId,
      },
    });

    const newCourse = await prisma.course.findUnique({
      where: {
        id: course.id,
      },
    });

    for (const unit of output_units) {
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({ course_id: course.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    console.error(error);
  }
}
