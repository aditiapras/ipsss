import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const teams = searchParams.get("team_id");
  try {
    const team = await prisma.team.findMany({
      where: {
        team_surename: teams.toUpperCase(),
      },
      select: {
        id: true,
        team_name: true,
        team_surename: true,
        team_unit: true,
        Profile: {
          select: {
            group: true,
            join_date: true,
            status: true,
            title: true,
            unit: {
              select: {
                id: true,
                unit_name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(team[0]);
  } catch (error) {
    return NextResponse.json({ error: "no data found" }, { status: 404 });
  }
}
