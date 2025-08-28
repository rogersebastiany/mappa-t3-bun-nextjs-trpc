"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
}

export default function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    document.startViewTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
