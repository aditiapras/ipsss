"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState(null);
  const [excel, setExcel] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();

    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setExcel(json);
      console.log(file);
      console.log(json);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center my-auto">
      <form onSubmit={handleUpload} className="flex flex-col gap-3">
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        {/* <input type="file" onChange={handleUpload} /> */}
        <Button type="submit">Upload</Button>
      </form>
      <p className="mt-5">{JSON.stringify(excel)}</p>
    </div>
  );
}
