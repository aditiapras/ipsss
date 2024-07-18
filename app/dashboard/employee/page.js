import ETable from "./table";
import { getTeamSelect } from "@/lib/actions";

export default async function Page() {
  const team = await getTeamSelect();
  return (
    <main className="flex flex-col items-start justify-center p-5">
      <p className="font-bold text-xl">Employee Status</p>
      <div className="flex flex-col w-full gap-5 mt-5">
        {/* TABLE */}
        <ETable />
      </div>
    </main>
  );
}
