import Navigation from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-50">
      <Navigation session={session} />
      {children}
    </main>
  );
}
