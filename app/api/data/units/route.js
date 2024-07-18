import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const teams = await prisma.unit.findMany({
    select: {
      id: true,
      unit_name: true,
      teamId: true,
    },
  });

  return NextResponse.json(teams);
}
