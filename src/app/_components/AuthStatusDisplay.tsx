"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import TransitionLink from "./TransitionLink";

export default function AuthStatusDisplay() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex items-center gap-4">
      {session?.user ? (
        <>
          <TransitionLink href="/posts" className="text-white hover:text-white/80">
            My Posts
          </TransitionLink>
          <TransitionLink href="/friends" className="text-white hover:text-white/80">
            My Friends
          </TransitionLink>
          <span className="text-white">{session.user.name}</span>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User avatar"}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="rounded-full bg-white/20 px-4 py-2 font-semibold text-purple-400 no-underline transition hover:bg-white/30"
          >
            Sign out
          </button>
        </>
      ) : (
        <TransitionLink
          href="/api/auth/signin"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Sign in
        </TransitionLink>
      )}
    </div>
  );
}
