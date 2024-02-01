import prisma from "@/lib/prisma";

export const getRecommended = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};
