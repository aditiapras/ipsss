import { ChevronRight, CloudUpload } from "lucide-react";
import Link from "next/link";
import ModalUnit from "./modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTeams } from "@/lib/get/get-data";
import TeamMember from "./team-member";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteUnit from "@/components/form/delete-unit";

export default async function Page({ params }) {
  const team = await getTeams(params.team_id);

  return (
    <main className="flex flex-col w-full items-start justify-center p-5">
      {/* Breadcrumb */}
      <div className="flex gap-2 items-center text-sm">
        <Link href="/dashboard/team" className="text-zinc-400 hover:text-black">
          Team
        </Link>
        <ChevronRight size={15} />
        <p className="font-medium">{team.team_name} Team</p>
      </div>
      <p className="font-bold text-xl mt-5">{team.team_name} Team</p>
      <div className="w-full grid grid-cols-3 gap-5 mt-5">
        <div className="w-full flex flex-col gap-5 col-span-3 lg:col-span-1">
          <Card className=" w-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <p>Team Unit</p>
                <ModalUnit team={team} />
              </CardTitle>
              <CardDescription>
                This is the list of team unit in {team.team_name} Team
              </CardDescription>
            </CardHeader>
            <CardContent>
              {team.team_unit.length > 0 ? (
                team.team_unit.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mb-5 border-b pb-3"
                  >
                    <div className="flex gap-5 items-center">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">
                          {team.team_surename}
                        </AvatarFallback>
                      </Avatar>
                      <p>{item.unit_name}</p>
                    </div>
                    <div className="flex items-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete Unit
                              <span className="font-semibold">
                                {" "}
                                {item.unit_name}
                              </span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <DeleteUnit unitId={item.id} />
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs bg-red-200 text-red-500 rounded-full px-2 py-1 w-fit">
                  No Team Unit Added
                </p>
              )}
            </CardContent>
          </Card>

          <Card className=" w-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <p>Team Info</p>
              </CardTitle>
              <CardDescription>{team.team_name} Team Info</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Total member:{" "}
                <span className="font-semibold">
                  {team.Profile.length}{" "}
                  {team.Profile.length > 1 ? "Members." : "Member."}{" "}
                </span>
              </p>
              {team.team_unit.length > 0 ? (
                team.team_unit.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mb-5 border-b pb-3"
                  >
                    <div className="flex gap-5 items-center">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">
                          {team.team_surename}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p>{item.unit_name}</p>
                        <p className="text-xs">
                          Total Member :
                          {
                            team.Profile.filter((p) => p.unit?.id === item.id)
                              .length
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs bg-red-200 text-red-500 rounded-full px-2 py-1 w-fit">
                  No Team Unit Added
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        <TeamMember team={team.id} />
      </div>
    </main>
  );
}
