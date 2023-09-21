import React from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import CreateCourseForm from "@/components/CreateCourseForm";
type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Create Crouse</h1>

      <div
        className="flex flex-col items-center  min-h-screen py-2 w-[50%]"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-row p-4 mt-5 border-none bg-secondary rounded-xl">
          <InfoIcon size={32} className="mr-4" />
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
            explicabo illum quod laborum praesentium vero recusandae ut
            aspernatur veritatis sunt.
          </div>
        </div>
        <CreateCourseForm />
      </div>
    </div>
  );
};

export default page;
