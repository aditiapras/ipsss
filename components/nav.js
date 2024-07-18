"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navigation({ session }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col px-5 pt-5 border-b bg-white/80 backdrop-blur-sm shadow-sm z-10 relative sticky -top-16 lg:top-0">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="font-hankook font-bold text-2xl text-orange-500">
            IPSS
          </p>
          <p className="font-hankook pl-3 border-l text-xs md:text-base font-semibold text-zinc-500">
            Indonesia Plant Scorecard System
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={session?.user?.image} />
            <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
          </Avatar>
          <p className="hidden md:block text-sm font-medium">
            {session?.user?.name}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={() => signOut()} className="w-full text-left">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex mt-3 text-sm font-medium overflow-x-auto">
        <Link
          href="/dashboard"
          className={`${
            pathname === "/dashboard"
              ? "border-b-2 border-orange-500 text-zinc-950 font-semibold"
              : "text-zinc-400"
          } px-5 py-2 transition-all hover:bg-zinc-100`}
        >
          Home
        </Link>
        <Link
          href="/dashboard/score"
          className={`${
            pathname === "/dashboard/score"
              ? "border-b-2 border-orange-500 text-zinc-950 font-semibold"
              : "text-zinc-400"
          } px-5 py-2 transition-all hover:bg-zinc-100`}
        >
          Score
        </Link>
        <Link
          href="/dashboard/upload"
          className={`${
            pathname === "/dashboard/upload"
              ? "border-b-2 border-orange-500 text-zinc-950 font-semibold"
              : "text-zinc-400"
          } px-5 py-2 transition-all hover:bg-zinc-100`}
        >
          Upload
        </Link>
        {/* <Link
          href="/dashboard/table"
          className={`${
            pathname === "/dashboard/table"
              ? "border-b-2 border-orange-500 text-zinc-950 font-semibold"
              : "text-zinc-400"
          } px-5 py-2 transition-all hover:bg-zinc-100`}
        >
          Table
        </Link> */}
        <Link
          href="/dashboard/employee"
          className={`${
            pathname === "/dashboard/employee"
              ? "border-b-2 border-orange-500 text-zinc-950 font-semibold"
              : "text-zinc-400"
          } px-5 py-2 transition-all hover:bg-zinc-100`}
        >
          Employee
        </Link>
        <Link
          href="/dashboard/scorecard"
          className={`${
            pathname === "/dashboard/scorecard"
              ? "border-b-2 border-orange-500 text-zinc-950 font-semibold"
              : "text-zinc-400"
          } px-5 py-2 transition-all hover:bg-zinc-100`}
        >
          Scorecard
        </Link>
        <Link
          href="/dashboard/team"
          className={`${
            pathname === "/dashboard/team" ||
            pathname === "/dashboard/team/m1" ||
            pathname === "/dashboard/team/m2" ||
            pathname === "/dashboard/team/pmt" ||
            pathname === "/dashboard/team/qc" ||
            pathname === "/dashboard/team/tech" ||
            pathname === "/dashboard/team/ehs" ||
            pathname === "/dashboard/team/hr" ||
            pathname === "/dashboard/team/cmt" ||
            pathname === "/dashboard/team/pch" ||
            pathname === "/dashboard/team/qa" ||
            pathname === "/dashboard/team/scm" ||
            pathname === "/dashboard/team/ftt"
              ? "border-b-2 border-orange-500 text-zinc-950 font-semibold"
              : "text-zinc-400"
          } px-5 py-2 transition-all hover:bg-zinc-100`}
        >
          Team
        </Link>
      </div>
    </nav>
  );
}
