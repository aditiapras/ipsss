"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import moment from "moment-timezone";

const prisma = new PrismaClient();

export const regUser = async (formData) => {
  const nik = formData.get("nik");
  const name = formData.get("name");
  const team = formData.get("team");
  const status = formData.get("status");
  const group = formData.get("group");
  const join_date = formData.get("join");
  const position = formData.get("position");
  const role = formData.get("role");
  const initialPassword = bcrypt.hashSync(nik, 10);

  const team_id = await prisma.team.findMany({
    where: {
      team_name: team,
    },
  });

  const data = await prisma.user.create({
    data: {
      name: name,
      nik: nik,
      password: initialPassword,
      profile: {
        create: {
          role_auth: role,
          group: group,
          join_date: moment(join_date).toISOString(),
          status: status,
          title: position,
          team: {
            connect: {
              id: team_id[0].id,
            },
          },
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log(data);
  return true;
};

export const getUnit = async () => {
  const unit = await prisma.unit.findMany();
  return unit;
};

export const getTeamSelect = async () => {
  const data = await prisma.team.findMany({
    select: {
      id: true,
      team_name: true,
      team_surename: true,
      team_unit: {
        select: {
          id: true,
          unit_name: true,
          job: true,
        },
      },
    },
  });
  return data;
};

export const registerManual = async (formData, team_id) => {
  const nik = formData.get("nik");
  const name = formData.get("name");
  const password = formData.get("password");
  const hashedPassword = bcrypt.hashSync(password, 10);
  const status = formData.get("status");
  const group = formData.get("group");
  const join_date = formData.get("join");
  const title = formData.get("title");
  const role = formData.get("role");
  const id = team_id;

  console.log({
    nik,
    name,
    hashedPassword,
    id,
    role,
    status,
    group,
    join_date: moment(join_date).toISOString(),
    title,
  });

  try {
    const data = await prisma.user.create({
      include: {
        profile: true,
      },
      data: {
        name,
        nik,
        password: hashedPassword,
        profile: {
          create: {
            role_auth: role,
            group,
            join_date: moment(join_date).toISOString(),
            status,
            title,
            team: {
              connect: {
                id: id,
              },
            },
          },
        },
      },
    });

    const log = await prisma.log.create({
      data: {
        log_user: "superuser",
        log_action: "CREATE USER",
        log_message: `User ${name}, with NIK ${nik} successfully created.`,
      },
    });
    return data;
  } catch (error) {
    const log = await prisma.log.create({
      data: {
        log_user: "superuser",
        log_action: "CREATE USER",
        log_message: `User ${name}, with NIK ${nik} failed to create. (Error: ${error})`,
      },
    });
    return false;
  }
};
