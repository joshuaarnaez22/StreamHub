import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export const getSelf = async () => {
  try {
    const self = await currentUser();

    if (!self || !self.username) {
      throw Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        externalUserId: self.id,
      },
    });

    if (!user) throw Error("Not found");

    return user;
  } catch (error: any) {
    throw Error(error.message);
  }
};
