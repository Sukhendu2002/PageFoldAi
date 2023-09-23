import React from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CourseList from "@/components/CourseList";


type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-4xl">
        My Courses
      </h1>
      <CourseList userId={session.user.id} />
    </div>
  );
};

export default page;
