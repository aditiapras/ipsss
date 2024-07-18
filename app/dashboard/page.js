import { Hourglass, LineChart } from "lucide-react";
import DailyChart from "./daily-chart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getCurrentUser } from "@/lib/get/get-data";
import moment from "moment-timezone";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(session.user?.nik);

  return (
    <main className="flex flex-col gap-5 items-start justify-center p-10">
      <p className="font-bold text-xl">Hello, {user.name}</p>
      <div className="grid grid-cols-4 gap-10 w-full px-10">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      {/* <div className="w-full flex flex-col lg:flex-row gap-5 h-[300px]">
        <div className="flex flex-col gap-3 p-5 rounded-md border w-full lg:w-1/5 h-[300px] bg-white">
          <p className="font-bold flex items-center gap-2">
            <Hourglass size={15} /> Current Session
          </p>
          <div className="grid grid-cols-2 text-sm gap-2 w-full">
            <p className="font-semibold">Username</p>
            <p>{user.name}</p>
            <p className="font-semibold">Team</p>
            <p>{user.profile.team.team_name}</p>
            <p className="font-semibold">Unit</p>
            <p>{user.profile.unit.unit_name}</p>
            <p className="font-semibold">Status</p>
            <p>{user.profile.status}</p>
            <p className="font-semibold">Group</p>
            <p>{user.profile.group}</p>
            <p className="font-semibold">Join Date</p>
            <p>{moment(user.profile.join_date).format("DD MMM YYYY")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5 rounded-md border h-[300px] w-full lg:w-4/5 bg-white">
          <p className="font-bold flex items-center gap-2">
            <LineChart size={15} /> Your Daily Score
          </p>
          <DailyChart />
        </div>
      </div> */}
    </main>
  );
}
