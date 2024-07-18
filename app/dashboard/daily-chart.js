"use client";
import { Hourglass, LineChart } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

export default function DailyChart() {
  const chartData = [
    {
      name: "1 Jul 2024",
      score: 90,
    },
    {
      name: "2 Jul 2024",
      score: 94,
    },
    {
      name: "3 Jul 2024",
      score: 95,
    },
    {
      name: "4 Jul 2024",
      score: 95,
    },
    {
      name: "5 Jul 2024",
      score: 92,
    },
    {
      name: "6 Jul 2024",
      score: 97,
    },
    {
      name: "7 Jul 2024",
      score: 97,
    },
    {
      name: "8 Jul 2024",
      score: 94,
    },
    {
      name: "9 Jul 2024",
      score: 94,
    },
    {
      name: "10 Jul 2024",
      score: 94,
    },
    {
      name: "11 Jul 2024",
      score: 94,
    },
    {
      name: "12 Jul 2024",
      score: 94,
    },
    {
      name: "13 Jul 2024",
      score: 94,
    },
    {
      name: "14 Jul 2024",
      score: 94,
    },
    {
      name: "15 Jul 2024",
      score: 94,
    },
    {
      name: "16 Jul 2024",
      score: 94,
    },
    {
      name: "17 Jul 2024",
      score: 94,
    },
    {
      name: "18 Jul 2024",
      score: 94,
    },
    {
      name: "19 Jul 2024",
      score: 94,
    },
    {
      name: "20 Jul 2024",
      score: 94,
    },
    {
      name: "21 Jul 2024",
      score: 94,
    },
    {
      name: "22 Jul 2024",
      score: 94,
    },
    {
      name: "23 Jul 2024",
      score: 94,
    },
    {
      name: "24 Jul 2024",
      score: 94,
    },
    {
      name: "25 Jul 2024",
      score: 94,
    },
    {
      name: "26 Jul 2024",
      score: 94,
    },
    {
      name: "27 Jul 2024",
      score: 94,
    },
    {
      name: "28 Jul 2024",
      score: 94,
    },
    {
      name: "29 Jul 2024",
      score: 94,
    },
    {
      name: "30 Jul 2024",
      score: 94,
    },
    {
      name: "31 Jul 2024",
      score: 94,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        width={700}
        height={240}
        data={chartData}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="name" className="text-xs" />
        <YAxis className="text-xs" domain={[50, 110]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#fed7aa">
          <LabelList dataKey="score" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
