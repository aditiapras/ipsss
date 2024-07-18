import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-zinc-100">
      {/* HEADER */}
      <div className="flex gap-3 bg-zinc-50 p-5 absolute w-full top-0 left-0 h-20 lg:h-32 items-center justify-center z-10">
        <div className="lg:w-[200px]">
          <Image src="/logo.png" alt="logo" width={200} height={100} />
        </div>
        <div className="flex gap-2 items-center pl-3 border-l-2">
          <p className="text-lg lg:text-3xl font-hankook font-bold text-orange-600">
            IPSS
          </p>
          <p className="text-xs lg:text-xs text-zinc-500 font-bold tracking-wide font-hankook text-wrap w-32">
            Indonesia Plant Scorecard System
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 p-10 rounded z-10 bg-white mt-20 font-hankook flex flex-col">
        <p className="text-lg font-semibold">Welcome!</p>
        <p className="text-xs text-zinc-500">
          This is official app of Indonesia Plant Scorecard System. Sign in to
          your account to continue
        </p>
        <Link
          href="/sign-in"
          className="mt-10 underline hover:text-black text-zinc-400 font-medium transition-all w-fit flex items-center gap-1"
        >
          Go to Login Page <ChevronRight size={15} />
        </Link>
      </div>
      <div className="absolute top-0 left-0 overflow-hidden h-4/5 lg:h-full">
        <img
          src="/tech.jpg"
          alt="logo"
          width={200}
          height={100}
          className="w-full lg:h-fit h-full object-cover"
        />
      </div>
      <p className="absolute bottom-0 text-center p-5 text-xs text-zinc-700 bg-zinc-100 w-full font-hankook">
        Copyright © {new Date().getFullYear()} IP | Production Management Team
      </p>
    </main>
  );
}
