import React from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

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
  return <pre>{JSON.stringify(course, null, 2)}</pre>;
};

export default page;
