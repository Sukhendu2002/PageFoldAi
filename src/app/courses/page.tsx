import React from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import axios from "axios";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  // const getData = async () => {
  //   const res = await axios.get("/api/courses");
  //   console.log(res);
  // };
  // getData();

  return <div>page</div>;
};

export default page;
