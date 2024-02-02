import prisma from "@/lib/prisma";
import { getSelf } from "@/actions/auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  let userId;
  try {
    const self = await getSelf();

    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];
  if (userId) {
    users = await prisma.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
    });
  } else {
    users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
