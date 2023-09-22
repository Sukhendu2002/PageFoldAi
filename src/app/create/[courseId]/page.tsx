import React from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Info } from "lucide-react";
import ConfirmChapters from "@/components/ConfirmChapters";

type Props = {
  params: {
    courseId: string;
  };
};

const page = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/create");
  }
  return (
    <div className="flex flex-col items-start max-w-xl mx-auto my-16">
      <h5 className="text-sm uppercase text-secondary-foreground/60">
        Course Name
      </h5>
      <h1 className="text-5xl font-bold">{course.name}</h1>

      <div className="flex p-4 mt-6 rounded-sm bg-secondary ">
        <Info className="w-6 h-6 mr-4 text-primary" />
        <div>
          We genarated chapters for each one of your units. Look over them and
          click the button to confirm and continue.
        </div>
      </div>
      <ConfirmChapters course={course} />
    </div>
  );
};

export default page;
