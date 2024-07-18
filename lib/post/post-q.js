"use server";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import moment from "moment-timezone";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const setUnit = async (formData) => {
  const session = await getServerSession(authOptions);
  const unit_name = formData.get("unit_name");
  const unit_desc = formData.get("unit_desc");
  const team_id = formData.get("team_id");

  try {
    const data = await prisma.team.update({
      where: {
        id: team_id,
      },
      data: {
        team_unit: {
          create: {
            unit_name: unit_name,
            unit_desc: unit_desc,
          },
        },
      },
    });
    const log = await prisma.log.create({
      data: {
        log_action: "ADD TEAM UNIT",
        log_message: `User ${session.user?.name} successfully added team unit: ${unit_name} for ${data.team_name} Team`,
        log_user: session.user?.nik,
      },
    });
revalidatePath('/');
    return data;
  } catch (error) {
    const log = await prisma.log.create({
      data: {
        log_action: "ADD TEAM UNIT",
        log_message: `User ${session.user?.name} failed to add team unit: ${unit_name} (Error: ${error})`,
        log_user: session.user?.name,
      },
    });
  }
};

export const assignUnit = async (formData, nik) => {
  const unit = formData.get("unit");

  const assign = await prisma.user.update({
    where: {
      nik: nik,
    },
    data: {
      profile: {
        update: {
          unit: {
            connect: {
              id: unit,
            },
          },
        },
      },
    },
  });
revalidatePath('/');
  return assign;
};

export const bulkImport = async (data) => {
  console.log(
    data.map((item) => {
      return {
        name: item.name,
        nik: String(item.nik),
        password: String(item.password),
        role: item.role,
        group: item.group,
        join_date: moment(String(item.join_date)).toISOString(),
        status: item.status,
        title: item.title,
        team_id: item.team_id,
      };
    })
  );
  try {
    await Promise.all(
      data.map(async (user) => {
        await prisma.user.create({
          data: {
            name: user.name,
            nik: String(user.nik),
            password: bcrypt.hashSync(String(user.password), 10),
            profile: {
              create: {
                role_auth: user.role,
                group: user.group,
                join_date: moment(String(user.join_date)).toISOString(),
                status: user.status,
                title: user.title,
                team: {
                  connect: {
                    id: user.team_id,
                  },
                },
              },
            },
          },
        });
      })
    );
revalidatePath('/');
    return true;
  } catch (error) {
    console.log(error);
  }
};
