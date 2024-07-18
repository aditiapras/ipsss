"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteUnit = async (unitId) => {
  console.log(unitId);
  const del = await prisma.unit.delete({
    where: {
      id: unitId,
    },
  });
  return true;
};
