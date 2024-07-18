"use client";
import { Pie, PieChart, Sector, Cell, ResponsiveContainer } from "recharts";
export default function PieCh() {
  const data = [
    { name: "Whit Collar", value: 400 },
    { name: "Blue Collar", value: 600 },
  ];
  const COLORS = ["#0088FE", "#00C49F"];
  return (
    <ResponsiveContainer>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          fill="#8884d8"
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
