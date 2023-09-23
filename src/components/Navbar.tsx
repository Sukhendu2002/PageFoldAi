import React from "react";
import Link from "next/link";
import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccount from "@/components/UserAccount";
import { ModeToggle } from "./ModeToggle";
type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <nav
      className="fixed inset-x-0 top-0  z-[10] h-fit border-b  py-2
      bg-white dark:bg-zinc-900 dark:border-zinc-50
    "
    >
      <div
        className="max-w-6xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                flex
                items-center
                justify-between"
      >
        <Link href={session?.user ? "/courses" : "/"}>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            PageFoldAi
          </p>
        </Link>

        <div className="flex items-center space-x-4">
          {session?.user && (
            <>
              <Link href="/create">
                <p className="text-zinc-900 dark:text-zinc-50">Create Course</p>
              </Link>
              <ModeToggle />
            </>
          )}
          {!session?.user ? (
            <>
              <Link href="/about">
                <p className="text-zinc-900 dark:text-zinc-50">About</p>
              </Link>
              <SignInButton />
              <ModeToggle />
            </>
          ) : (
            <UserAccount user={session.user} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
