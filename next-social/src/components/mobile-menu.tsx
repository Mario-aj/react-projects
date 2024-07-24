"use client";

import Link from "next/link";
import { useState } from "react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((state) => !state)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen && "rotate-45"
          } origin-left ease-in-out duration-300`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen && "opacity-0"
          } ease-in-out duration-300`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen && "-rotate-45"
          } origin-left ease-in-out duration-300`}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-20 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/">Friend</Link>
          <Link href="/">Group</Link>
          <Link href="/">Stories</Link>
          <Link href="/">Login</Link>
        </div>
      )}
    </section>
  );
};
