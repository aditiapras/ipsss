"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSWR from "swr";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MemberTable({ teamId }) {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSWR("/api/data/users", fetcher);

  if (isLoading)
    return (
      <div className="flex flex-col items-start justify-start h-full border-t p-5 mt-16 gap-5">
        <div className="flex gap-2 w-full">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-10 w-[90%] rounded-full" />
        </div>
        <div className="flex gap-2 w-full">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-10 w-[90%] rounded-full" />
        </div>
        <div className="flex gap-2 w-full">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-10 w-[90%] rounded-full" />
        </div>
        <div className="flex gap-2 w-full">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-10 w-[90%] rounded-full" />
        </div>
        <div className="flex gap-2 w-full">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-10 w-[90%] rounded-full" />
        </div>
      </div>
    );
  const filteredData = data
    .filter((item) => item.profile?.team.id === teamId)
    .map((item) => ({
      ...item,
      profile: {
        ...item.profile,
        team: {
          ...item.profile?.team,
          team_name: item.profile.team.team_name,
        },
      },
    }));

  const filterSearch = filteredData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-0 mt-3">
        <div className="flex justify-between items-center border-b pb-3 w-full">
          <input
            type="text"
            className="w-[180px] text-sm border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-zinc-500"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <ScrollArea className="h-[400px] mt-2">
          {filterSearch.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 border-b py-1">
              <div className="py-2 px-4 flex  justify-between">
                <div className="flex gap-5 items-center">
                  <Avatar>
                    <AvatarFallback className="text-sm font-bold">
                      {item.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm lg:text-base">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {item.profile.team.team_name} Team
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <Button variant="outline">Add Member</Button>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}
