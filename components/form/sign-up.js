"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerManual } from "@/lib/actions";

function SubmitButton({ secret }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || secret !== "hanta1ip"}
      type="submit"
      className="w-full disabled:opacity-50 disabled:cursor-not-allowed mt-5 col-span-2"
    >
      {pending ? (
        <p className="flex items-center gap-2">
          <LoaderCircle size={15} className="animate-spin" />
          Loading...
        </p>
      ) : (
        "Register"
      )}
    </Button>
  );
}

export default function SignUp({ secret }) {
  const router = useRouter();

  const teams = [
    {
      id: "ip_m1",
      name: "Manufacturing 1 Team",
      value: "Manufacturing 1",
    },
    {
      id: "ip_m2",
      name: "Manufacturing 2 Team",
      value: "Manufacturing 2",
    },
    {
      id: "ip_pmt",
      name: "Production Management Team",
      value: "Production Management",
    },
    {
      id: "ip_qc",
      name: "Quality Control Team",
      value: "Quality Control",
    },
    {
      id: "ip_tech",
      name: "Technology Team",
      value: "Technology",
    },
    {
      id: "ip_qa",
      name: "Quality Assurance Team",
      value: "Quality Assurance",
    },
    {
      id: "ip_ftt",
      name: "Facility Technology Team",
      value: "Facility Technology",
    },
    {
      id: "ip_ehs",
      name: "EHS Team",
      value: "EHS",
    },
    {
      id: "ip_cmt",
      name: "Corporate Management Team",
      value: "Corporate Management",
    },
    {
      id: "ip_pch",
      name: "Purchasing Team",
      value: "Purchasing",
    },

    {
      id: "ip_hr",
      name: "Human Resource Team",
      value: "Human Resource",
    },
  ];

  return (
    <form
      action={async (formData) => {
        const filter_id = teams
          .filter((item) => item.value === formData.get("team"))
          .map((item) => item.id);
        const team_id = filter_id[0];

        await registerManual(formData, team_id);
        window.location.reload();
      }}
      className="grid lg:grid-cols-2 w-full mt-0 p-5 gap-5 lg:px-10 font-hankook"
    >
      <div className="w-full flex flex-col col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          NIK
        </label>
        <input
          type="text"
          name="nik"
          id="nik"
          className="p-2 rounded-md border rounded-md text-sm"
          placeholder="NIK"
          required
          minLength={8}
          maxLength={8}
          pattern="[0-9]*"
        />
      </div>
      <div className="w-full flex flex-col col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 rounded-md border rounded-md text-sm"
          placeholder="Name"
          required
        />
      </div>
      <div className="w-full flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="p-2 rounded-md border rounded-md text-sm"
          placeholder="Password"
          required
        />
      </div>
      <div className="w-full flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Team
        </label>
        <Select name="team" className="font-hankook">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Status
        </label>
        <Select name="status">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Karyawan">Karyawan</SelectItem>
            <SelectItem value="Magang">Magang</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Group
        </label>
        <Select name="group">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="D">D</SelectItem>
            <SelectItem value="Non Shift">Non Shift</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Join Date
        </label>
        <input
          type="date"
          name="join"
          id="join"
          className="w-full p-2 text-sm border rounded-md"
        />
      </div>
      <div className="w-full flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Title
        </label>
        <Select name="title">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Title" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="White Collar">White Collar</SelectItem>
            <SelectItem value="Blue Collar">Blue Collar</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="" className="text-sm font-semibold">
          Role
        </label>
        <Select name="role">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="superuser">Super User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SubmitButton secret={secret} />
    </form>
  );
}
