import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { MobileMenu } from "./mobile-menu";

export const Navbar = () => {
  return (
    <section className="h-24 flex items-center justify-between">
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          LAMASOCIAL
        </Link>
      </div>

      <div className="hidden md:flex w-[50%] items-center justify-between">
        <div className="flex gap-6 text-gray-600 text-sm">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              className="w-4 h-4"
              src="/home.png"
              alt="Homepage icon"
              width={16}
              height={16}
            />
            <span>Homepage</span>
          </Link>

          <Link href="/friends" className="flex gap-2 items-center">
            <Image
              className="w-4 h-4"
              src="/friends.png"
              alt="Friends icon"
              width={16}
              height={16}
            />
            <span>Friends</span>
          </Link>

          <Link href="/stories" className="flex gap-2 items-center">
            <Image
              className="w-4 h-4"
              src="/stories.png"
              alt="Stores icon"
              width={16}
              height={16}
            />
            <span>Stories</span>
          </Link>
        </div>

        <div className="hidden xl:flex bg-slate-100 items-center rounded-xl p-2">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="search icon" width={14} height={14} />
        </div>
      </div>

      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border border-gray-500 border-t-0" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image
                src="/people.png"
                alt="people icon"
                width={24}
                height={24}
              />
            </div>

            <div className="cursor-pointer">
              <Image
                src="/messages.png"
                alt="messages icon"
                width={20}
                height={20}
              />
            </div>

            <div className="cursor-pointer">
              <Image
                src="/notifications.png"
                alt="notifications icon"
                width={20}
                height={20}
              />
            </div>

            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src="/login.png" alt="" width={20} height={20} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>

        <MobileMenu />
      </div>
    </section>
  );
};
