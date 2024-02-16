import prisma from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self.user) {
      return false;
    }

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      return false;
    }

    if (self.user.id === otherUser.id) {
      return false;
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.user.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const allBlockUsers = async () => {
  const self = await getSelf();

  if (self.user) {
    const blockedUsers = await prisma.block.findMany({
      where: {
        blockerId: self.user.id,
      },
      include: {
        blocked: true,
      },
    });

    return blockedUsers;
  }

  return [];
};
