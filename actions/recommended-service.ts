import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const getRecommended = async () => {
  const { userId } = await auth();

  let users = [];
  if (userId) {
    users = await prisma.user.findMany({
      where: {
        NOT: {
          externalUserId: userId,
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
