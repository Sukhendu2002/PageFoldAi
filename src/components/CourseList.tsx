"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
};

const CourseList = ({ userId }: Props) => {
  const router = useRouter();
  const [courses, setCourses] = React.useState([]);
  const { mutate: loadCourses, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/course", {
        userId,
      });
      console.log(response.data.data);
      return response.data.data;
    },
  });

  React.useEffect(() => {
    loadCourses(undefined, { onSuccess: (data) => setCourses(data) });
    console.log("courses", courses);
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {courses.map((course: { id: string; name: string }) => (
        <div
          key={course.id}
          className="border border-gray-200 p-4 rounded-md shadow-md
            h-24 flex items-center justify-center
            cursor-pointer
            hover:shadow-lg hover:border-gray-300
            transition-all 
            
          "
          onClick={() => router.push(`/create/${course.id}`)}
        >
          {course.name}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
