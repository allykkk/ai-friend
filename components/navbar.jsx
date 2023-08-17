"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Link from "next/link";
import MobileSidebar from "@/components/mobile-sidebar";
import Image from "next/image";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />

        <Link href="/">

          <Image alt="Friends.ai app logo" width={150} height={100} className="hidden md:block text-xl md:text-3xl font-bold text-primary" src="/friends-ai.svg"/>
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
