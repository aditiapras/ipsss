import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllUser, getUsers } from "@/lib/get/get-data";
import { Blocks, Frown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import PieCh from "./pie-chart";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = await getUsers(session.user?.id);
  const allUsers = getAllUser();
  return (
    <main className="p-5 grid grid-cols-6 gap-5">
      <div className="flex flex-col bg-white rounded-md p-5 border col-span-2">
        <p className="font-bold text-xl">Scorecard</p>
        <p className="text-sm text-zinc-500 mt-2">Manage your scorecard</p>
        <p className="text-sm text-zinc-500 flex items-center mt-5 gap-3">
          <Blocks size={50} className="" />
          It&apos;s seem that you have not been setup the scorecard
        </p>
        <Button className="mt-5 w-fit" variant="outline">
          Setup Scorecard
        </Button>
      </div>

      <div className="w-full col-span-4"></div>
      <div className="flex flex-col bg-white rounded-md p-5 border col-span-1">
        <p className="text-sm flex items-center justify-between">
          Total Member
          <User size={15} />
        </p>
        <p className="font-bold text-4xl mt-3">
          {(await allUsers).length}/1500
        </p>
      </div>
    </main>
  );
}
