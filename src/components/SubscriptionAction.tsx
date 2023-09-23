"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

type Props = {
  session: any;
};

const SubscriptionAction = ({ session }: Props) => {
  const [loading, setLoading] = React.useState(false);
  // const handleSubscribe = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get("/api/stripe");
  //     window.location.href = response.data.url;
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
      {session?.user.credits} / 5 Free Generations
      <Progress
        className="mt-2"
        value={session?.user.credits ? (session.user.credits / 5) * 100 : 0}
      />
      {/* <Button
        disabled={loading}
        onClick={handleSubscribe}
        className="mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
      >
        Upgrade
        <Zap className="fill-white ml-2" />
      </Button> */}
    </div>
  );
};

export default SubscriptionAction;
