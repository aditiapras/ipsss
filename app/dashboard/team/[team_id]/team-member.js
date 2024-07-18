"use client";
import {
  CircleX,
  CloudUpload,
  Download,
  File,
  FilesIcon,
  Layers3,
} from "lucide-react";
import { useState } from "react";
import MemberTable from "./member-table";
import { useRouter, useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { bulkImport } from "@/lib/post/post-q";
import Link from "next/link";

export default function TeamMember({ team }) {
  const router = useRouter();
  const params = useSearchParams();
  const query =
    !params.get("add") || params.get("add") === "false" ? false : true;
  const [show, setShow] = useState(query);
  const page_id = team.slice(3, 6);

  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      setTimeout(async () => {
        await bulkImport(json);
      }, 2000);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="col-span-3 lg:col-span-1 border bg-white rounded-md p-5 flex flex-col h-fit">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Team Members</p>
        <button
          onClick={() => {
            setShow(
              !show,
              router.replace(`/dashboard/team/${page_id}?add=${!show}`)
            );
          }}
          className="text-sm text-blue-400 hover:text-blue-500 hover:underline hover:cursor-pointer"
        >
          {show && "View All Members"}
          {!show && "+ Add Multiple Member"}
        </button>
      </div>
      <p className="text-sm mt-2 text-zinc-500">
        Production Management Team member lists
      </p>
      {show && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm mt-3 font-semibold">Upload Files</p>
            <p className="text-xs text-zinc-500">Upload files attachment</p>
          </div>
        </div>
      )}
      {show && (
        <div className="h-full w-full flex flex-col mt-3">
          <form action={handleUpload} className="flex flex-col w-full">
            <div className="w-full bg-zinc-100 flex flex-col h-full items-center justify-center py-10 rounded-md border-2 border-dashed">
              <Layers3 size={80} className="text-zinc-300" />
              <p className="text-sm font-medium mt-2">Upload File</p>
              <input
                type="file"
                className="hidden"
                id="upload"
                onChange={(e) => setFile(e.target.files[0])}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                required
              />
              <label
                htmlFor="upload"
                disable={file}
                className={`mt-2 text-sm px-4 py-2 flex items-center gap-2 bg-zinc-300 text-zinc-600 hover:text-white rounded-md hover:bg-zinc-500 cursor-pointer active:scale-90 transition-all duration-300`}
              >
                Choose File <File size={14} />
              </label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="text-xs text-zinc-500">
                *Only Excel files are allowed
              </p>
              <Link
                href={"/template.xlsx"}
                download
                className="text-xs w-fit font-medium flex items-center gap-1 underline text-blue-400 hover:text-blue-500 transition-all"
              >
                <Download size={12} />
                Download sampe file upload
              </Link>
            </div>

            <p className="text-sm mt-5 font-medium">Uploaded Files</p>
            <div className="text-xs text-red-400 p-3 rounded-md border flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <FilesIcon
                  size={18}
                  className={`${!file ? "text-red-400" : "text-zinc-500"}`}
                />
                <p className="text-xs font-medium text-zinc-500">
                  {file?.name}
                </p>
                {!file && "No file selected"}{" "}
              </div>
              {file && (
                <button onClick={() => setFile(null)}>
                  <CircleX size={18} />
                </button>
              )}
            </div>

            <button
              disabled={!file}
              className="mt-5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-6 py-2 rounded-md disabled:bg-blue-500 bg-blue-600 text-white hover:bg-blue-500 transition-all"
            >
              Upload File <CloudUpload size={14} />
            </button>
          </form>
        </div>
      )}
      {!show && <MemberTable teamId={team} />}
    </div>
  );
}
