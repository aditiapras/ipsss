"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export const getTeams = async (teams) => {
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
revalidatePath('/');
  return team[0];
};

export const getUsers = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      nik: true,
      profile: {
        select: {
          role_auth: true,
          group: true,
          join_date: true,
          status: true,
          title: true,
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
          score: true,
        },
      },
    },
  });
revalidatePath('/');
  return user;
};

export const getAllUser = async () => {
  const user = await prisma.user.findMany({
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
          team: {
            select: {
              id: true,
              team_name: true,
              team_unit: {
                select: {
                  id: true,
                  unit_name: true,
                },
              },
            },
          },
        },
      },
    },
  });
revalidatePath('/');
  return user;
};

export const getCurrentUser = async (nik) => {
  const data = await prisma.user.findUnique({
    where: {
      nik: nik,
    },
    select: {
      name: true,
      nik: true,
      profile: {
        select: {
          group: true,
          status: true,
          join_date: true,
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
          job: true,
        },
      },
    },
  });
revalidatePath('/');
  return data;
};
