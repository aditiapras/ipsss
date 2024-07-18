import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      nik: true,
      profile: {
        select: {
          group: true,
          join_date: true,
          status: true,
          title: true,
          role_auth: true,
          team: {
            select: {
              id: true,
              team_name: true,
            },
          },
          unit: {
            select: {
              id: true,
              unit_name: true,
            },
          },
          job: {
            select: {
              id: true,
              job_name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(data);
}
