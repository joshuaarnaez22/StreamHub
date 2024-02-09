import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export const getSelf = async () => {
  try {
    const self = await currentUser();

    if (!self || !self.username) {
      return { error: "Unauthorized", user: null };
    }

    const user = await prisma.user.findUnique({
      where: {
        externalUserId: self.id,
      },
    });

    if (!user) {
      return { error: "Not found", user: null };
    }

    return {
      error: null,
      user,
    };
  } catch (error: any) {
    console.error(error); // Log errors for debugging
    return { error: "Something went wrong", user: null };
  }
};

export const getSelfByUsername = async (username: string) => {
  try {
    const self = await currentUser();

    if (!self || !self.username) {
      return { error: "Unauthorized", user: null };
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        stream: true,
      },
    });

    if (!user) {
      return { error: "Not found", user: null };
    }

    if (self.username !== user.username) {
      return { error: "Unauthorized", user: null };
    }
    return {
      error: null,
      user,
    };
  } catch (error: any) {
    console.error(error); // Log errors for debugging
    return { error: "Something went wrong", user: null };
  }
};
