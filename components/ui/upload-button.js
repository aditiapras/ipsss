"use client";
import { CloudUpload, EyeIcon, LoaderCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { useState } from "react";
import { bulkImport } from "@/lib/post/post-q";
import { useRouter } from "next/navigation";

export default function UploadButton() {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const [pending, setPending] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      console.log(json);
      setData(json);

      setPending(true);
      setTimeout(async () => {
        await bulkImport(json);
        setPending(false);
        router.refresh();
        window.location.reload();
      }, 3500);
      if (file) {
        setDisable(true);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <form action="" className="flex gap-2">
        <div className="flex gap-2 items-center">
          <input
            hidden
            type="file"
            name="files"
            id="files"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setDisable(true);
            }}
            disabled={disable}
            className={`${disable ? "cursor-not-allowed" : ""}`}
          />
          <label
            htmlFor="files"
            className={`text-sm font-medium px-4 py-2 transition-all bg-zinc-950  text-white rounded-md flex gap-2 items-center hover:cursor-pointer hover:bg-zinc-700 ${
              disable
                ? "cursor-not-allowed bg-zinc-950/50 hover:bg-zinc-950/50 active:scale-100"
                : "active:scale-90"
            }`}
          >
            <CloudUpload size={15} /> Upload File
          </label>
        </div>
        <button
          type="button"
          className="disabled:cursor-not-allowed disabled:opacity-50 text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-md flex gap-2 items-center hover:cursor-pointer hover:bg-blue-500"
          onClick={handleUpload}
          disabled={pending}
        >
          {pending ? (
            <p className="flex items-center gap-2">
              <LoaderCircle size={15} className="animate-spin" />
              Uploading...
            </p>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </>
  );
}
