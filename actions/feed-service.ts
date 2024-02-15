import prisma from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const getStreams = async () => {
  let self;
  let streams = [];

  try {
    self = await getSelf();
  } catch (error) {
    self = null;
  }

  if (self?.user) {
    streams = await prisma.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockerId: self.user.id,
              },
            },
          },
        },
      },
      select: {
        id: true,
        isLive: true,
        thumbnailUrl: true,
        name: true,
        user: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  } else {
    streams = await prisma.stream.findMany({
      select: {
        id: true,
        isLive: true,
        thumbnailUrl: true,
        name: true,
        user: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  }

  return streams;
};
