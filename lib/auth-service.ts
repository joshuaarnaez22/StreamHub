import { currentUser } from "@clerk/nextjs";
import prisma from "./prisma";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self) return new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) return new Error("Not found");

  return user;
};
