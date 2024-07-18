import Link from "next/link";

export default function Page() {
  const team = [
    {
      id: 1,
      name: "Manufacturing 1 Team",
      link: "m1",
    },
    {
      id: 2,
      name: "Manufacturing 2 Team",
      link: "m2",
    },
    {
      id: 3,
      name: "Production Management Team",
      link: "pmt",
    },
    {
      id: 4,
      name: "Quality Control Team",
      link: "qc",
    },
    {
      id: 5,
      name: "Technology Team",
      link: "tech",
    },
    {
      id: 6,
      name: "EHS Team",
      link: "ehs",
    },
    {
      id: 7,
      name: "Human Resource Team",
      link: "hr",
    },
    {
      id: 8,
      name: "Corporate Management Team",
      link: "cmt",
    },
    {
      id: 9,
      name: "Purchasing Team",
      link: "pch",
    },
    {
      id: 10,
      name: "Quality Assurance Team",
      link: "qa",
    },
    {
      id: 12,
      name: "Facility Technology Team",
      link: "ftt",
    },
  ];
  return (
    <main className="flex flex-col w-full items-start justify-center p-5">
      <p className="font-bold text-lg">Team Setup</p>
      <div className="grid lg:grid-cols-3 gap-5 mt-5 w-full lg:w-1/2 xl:w-2/3">
        {team.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/team/${item.link}`}
            className="p-3 border rounded-md bg-gradient-to-b from-zinc-200/50 to-white text-sm font-semibold shadow-md hover:drop-shadow-md"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
