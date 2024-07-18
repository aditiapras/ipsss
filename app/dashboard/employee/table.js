"use client";

import useSWR from "swr";
import moment from "moment-timezone";
import { BringToFront, PenBox, UserPlus } from "lucide-react";
import DataTable from "@/components/table/data-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { assignUnit } from "@/lib/post/post-q";
import { useFormStatus } from "react-dom";

function SubmitButton({ hide }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={`col-span-2 disabled:cursor-not-allowed ${hide && "hidden"}`}
    >
      {pending ? "Loading" : "Submit"}
    </Button>
  );
}

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ETable() {
  const { data: data1, isLoading: isLoading1 } = useSWR(
    "/api/data/users",
    fetcher
  );
  const { data: data2, isLoading: isLoading2 } = useSWR(
    "/api/data/units",
    fetcher
  );
  const router = useRouter();

  if (isLoading1) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      accessorKey: "nik",
      header: "NIK",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "team",
      header: "Team",
      cell: ({ row }) => row.original.profile?.team.team_name,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => {
        if (isLoading2) return <div>Loading...</div>;
        const unit = row.original.profile?.unit?.unit_name;
        const team_id = row.original.profile?.team.id;
        return (
          <>
            {unit ? (
              <p>{unit}</p>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger>
                  <p className="flex items-center gap-2 text-blue-400 hover:text-blue-500 hover:underline">
                    Assign Unit <BringToFront size={15} />
                  </p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Assign Unit</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will be performed on{" "}
                      <span className="font-medium">{row.original.name}</span>,
                      assign team unit to this employee.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <form
                    action={async (formData) => {
                      const nik = row.original.nik;
                      await assignUnit(formData, nik);
                      router.refresh();
                      window.location.reload();
                    }}
                    className="w-full flex flex-col gap-2 w-full"
                  >
                    <p>
                      {data2
                        .filter((team) => team.teamId === team_id)
                        .map((team) => team.unit_name).length === 0 ? (
                        <p className="text-red-500 text-xs">
                          No unit team available, please add unit first at team
                          page
                        </p>
                      ) : (
                        <Select id="unit" name="unit" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {data2
                              .filter((team) => team.teamId === team_id)
                              .map((team) => (
                                <SelectItem value={team.id} key={team.id}>
                                  {team.unit_name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      )}
                    </p>

                    <div className="flex gap-2 justify-end mt-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <SubmitButton
                        hide={
                          data2
                            .filter((team) => team.teamId === team_id)
                            .map((team) => team.unit_name).length === 0
                            ? true
                            : false
                        }
                      />
                    </div>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => row.original.profile?.status,
    },
    {
      accessorKey: "group",
      header: "Group",
      cell: ({ row }) => row.original.profile?.group,
    },
    {
      accessorKey: "join_date",
      header: "Join Date",
      cell: ({ row }) =>
        moment(row.original.profile?.join_date).format("DD MMM YYYY") ?? "---",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => row.original.profile?.title,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <button className="text-blue-400 hover:text-blue-500 flex items-center gap-2 hover:underline">
              Edit <PenBox size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col p-5 border rounded-md w-full bg-white mih-h-[2000px]">
      <div className="flex items-center justify-between mb-5">
        <p className="font-semibold">List Employee</p>
        <button className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 transition-all hover:scale-[98%] text-white rounded-md flex items-center gap-2">
          <UserPlus size={15} /> Add Employee
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data1}
        filters={true}
        headers={true}
        search={true}
      />
    </div>
  );
}
