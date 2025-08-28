
"use client";

import { signIn } from "next-auth/react";

export function LoginButtons() {
  return (
    <button
      onClick={() => signIn("discord")}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      Sign in with Discord
    </button>
  );
}