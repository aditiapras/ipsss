import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const score = [
    {
      id: 61600540,
      name: "Aditia Prasetian",
      score: 95,
      grade: "A",
      rank: 1,
    },
    {
      id: 61600541,
      name: "Achmad Rivai",
      score: 93,
      grade: "A",
      rank: 2,
    },

    {
      id: 61600542,
      name: "Iwan Setiawan",
      score: 79,
      grade: "B",
      rank: 3,
    },
    {
      id: 61600543,
      name: "Farid Mustofa",
      score: 67,
      grade: "C",
      rank: 4,
    },
  ];
  return (
    <main className="flex flex-col items-center justify-center p-5">
      <p className="text-left w-full font-bold mb-5">Employee Rank</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>NIK</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {score.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{data.rank}</TableCell>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell className="font-medium">{data.name}</TableCell>
              <TableCell className="font-medium">{data.score}</TableCell>
              <TableCell className="font-medium">{data.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
