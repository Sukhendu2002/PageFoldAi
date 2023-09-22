"use client";
import { Chapter } from "@prisma/client";
import React from "react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {
    const { toast } = useToast();
    const addChapterIdtoSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdtoSet();
      }
    }, [chapter, addChapterIdtoSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        if (chapter.videoId) {
          addChapterIdtoSet();
          return;
        }
        getChapterInfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterIdtoSet();
          },
          onError: (error) => {
            console.log(error);
            setSuccess(false);
            toast({
              title: "Error",
              description: "There was an error loading the chapter",
              variant: "destructive",
            });
            addChapterIdtoSet();
          },
        });
      },
    }));
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });
    return (
      <div
        key={chapter.id}
        className={cn("flex items-center mt-2 py-1  rounded-sm", {
          "bg-secondary": success === null,
          "bg-green-500": success === true,
          "bg-red-500": success === false,
        })}
      >
        <h5
          className="text-lg 
        ml-4
      "
        >
          {chapter.name}
        </h5>
        {isLoading && <Loader2 className="animate-spin w-6 h-6 ml-4" />}
      </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";
export default ChapterCard;
