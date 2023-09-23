import { Chapter, Unit } from "@prisma/client";
import React from "react";
import { searchYoutube } from "@/lib/youtube";
import { prisma } from "@/lib/db";

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

const MainVideoSummary = async ({
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: Props) => {
  if (!chapter.videoId || chapter.videoId === "") {
    console.log("searching for video id");
    const videoId = await searchYoutube(`${chapter.name} ${unit.name}`);
    console.log("videoId", videoId);
    if (videoId) {
      await prisma.chapter.update({
        where: { id: chapter.id },
        data: { videoId },
      });
    }
  }
  return (
    <div className="flex-[2] ">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="chapter video"
        className="w-full h-[500px] mt-4 rounded-xl"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
