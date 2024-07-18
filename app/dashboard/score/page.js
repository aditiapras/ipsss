import Score from "./score";
import Search from "./search";

export default function Page() {
  return (
    <div className="flex flex-col p-5 md:p-10 bg-zinc-50">
      <Search />
      {/* <Score /> */}
    </div>
  );
}
