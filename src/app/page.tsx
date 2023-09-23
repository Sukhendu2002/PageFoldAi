import Image from "next/image";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/courses");
  }
  return <h1 className="text-red-600">Hello World</h1>;
}
