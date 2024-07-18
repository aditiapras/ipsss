"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Score({ name, nik, score }) {
  const [scores, setScores] = useState([false]);

  const catScore = [
    {
      cat: "Quality Lot NC",
      item: [{ id: "21", name: "Quality Issue > 5", point: -5 }],
    },
    {
      cat: "Safety",
      item: [
        { id: "22", name: "Tidak menggunakan safety shoes", point: -5 },
        { id: "23", name: "Checksheet safety tidak diisi", point: -5 },
        { id: "24", name: "Bekerja tidak safety", point: -5 },
      ],
    },
    {
      cat: "Kebersihan dan Kerapihan",
      item: [
        {
          id: "25",
          name: "Tidak mengisi CS harian / CS tidak sesuai aktual",
          point: -4,
        },
        { id: "26", name: "Tidak mengisi data scrap material", point: -4 },
        { id: "27", name: "Tidak mengisi daily machine", point: -2 },
        {
          id: "28",
          name: "Material/Sampah di lantai (Area Let Off) 1x",
          point: -1,
        },
        {
          id: "29",
          name: "Material/Sampah di lantai (Area Let Off) 2x",
          point: -2,
        },
        {
          id: "30",
          name: "Material/Sampah di lantai (Area Mesin Depan)",
          point: -2,
        },
        { id: "31", name: "Cart/Cell tidak rapi (1X)", point: -2 },
        { id: "32", name: "Cart/Cell tidak rapi (2X)", point: -2 },
        { id: "33", name: "G/T campur/tidak ada marking (1X)", point: -3 },
        { id: "34", name: "G/T campur/tidak ada marking (2X)", point: -3 },
        {
          id: "35",
          name: "Recoup tidak rapih/tidak ada identitas (1X)",
          point: -2,
        },
        {
          id: "36",
          name: "Recoup tidak rapih/tidak ada identitas (2X)",
          point: -2,
        },
        { id: "37", name: "Spare part tidak rapi", point: -2 },
        { id: "38", name: "Part rusak", point: -5 },
        {
          id: "39",
          name: "Meninggalkan scrap di shift selanjutnya",
          point: -3,
        },
        { id: "40", name: "Scrap G/T >2 di area mesin", point: -1 },
      ],
    },
    {
      cat: "Briefing",
      item: [{ id: "41", name: "Tidak ikut briefing", point: -2 }],
    },
    {
      cat: "Responsibility",
      item: [
        { id: "42", name: "Alat kerja hilang", point: -3 },
        { id: "43", name: "Warning letter", point: -5 },
        { id: "44", name: "Makan lebih dari 45 menit", point: -2 },
        { id: "45", name: "Break lebih dari 15 menit", point: -2 },
        {
          id: "46",
          name: "Tidak inspeksi daily score dengan benar",
          point: -2,
        },
        { id: "47", name: "Tidak edukasi/sosialisasi dengan benar", point: -2 },
      ],
    },
  ];

  const [nilai, setNilai] = useState(score);

  return (
    <div className="w-full mt-5">
      <p className="mb-2">Result</p>
      <div className="grid grid-cols-2 border-b pb-3 text-sm">
        <p>Employee ID</p>
        <p>: {nik}</p>
        <p>Employee Name</p>
        <p>: {name}</p>
      </div>
      <p className="pb-3 mt-5">
        Total Score: <span className="font-bold">{nilai}</span>
      </p>

      <p className="font-semibold mt-5 mb-2">Score Category</p>

      <form action="">
        <Accordion type="multiple" collapsible>
          {catScore.map((item, index) => (
            <AccordionItem key={index} value={item.cat}>
              <AccordionTrigger className="font-semibold">
                {item.cat}
              </AccordionTrigger>
              <AccordionContent>
                {item.item.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mt-2"
                  >
                    <label htmlFor={item.id} className="w-full">
                      {item.name}
                    </label>
                    <Checkbox
                      id={item.id}
                      onCheckedChange={(e) => {
                        setScores(!scores[item.id]);
                        if (e) {
                          setNilai(nilai + item.point);
                        } else {
                          setNilai(nilai - item.point);
                        }
                      }}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button type="submit" className="mt-5 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
