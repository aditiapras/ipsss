"use client";
import { useState } from "react";
import Score from "./score";

export default function Search() {
  const [nik, setNik] = useState("");

  const employee = [
    {
      nik: 61600540,
      name: "Aditia Prasetian",
      score: 100,
    },
    {
      nik: 61600541,
      name: "Achmad Rivai",
      score: 100,
    },
    {
      nik: 61600542,
      name: "Iwan Setiawan",
      score: 100,
    },
    {
      nik: 61600543,
      name: "Farid Mustofa",
      score: 100,
    },
  ];

  const filterEmployee = employee.find(
    (e) => e.nik == nik || e.name.toLowerCase() == nik.toLowerCase()
  );

  return (
    <div className="w-full md:w-1/4 mx-auto mt-5">
      <p className="text-sm font-medium">Search employee</p>
      <input
        type="text"
        name="employee"
        id="employee"
        placeholder="NIK or Name"
        className="border border-zinc-300 rounded-md px-2 py-1 mt-2 text-sm w-full"
        onChange={(e) => setNik(e.target.value)}
      />
      <p className="text-sm mt-2">
        {filterEmployee?.name ? (
          <Score
            name={filterEmployee?.name}
            nik={filterEmployee?.nik}
            score={filterEmployee?.score}
          />
        ) : (
          "Not found"
        )}
      </p>
    </div>
  );
}
