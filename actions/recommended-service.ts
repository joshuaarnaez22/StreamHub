import prisma from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  const self = await getSelf();
  let users = [];
  if (self.user) {
    const followersIds = await prisma.follow.findMany({
      where: {
        followerId: self.user.id,
      },
      select: {
        followingId: true,
      },
    });

    const blockedIds = await prisma.block.findMany({
      where: {
        blockedId: self.user.id,
      },
      select: {
        blockerId: true,
      },
    });

    const blockingIds = await prisma.block.findMany({
      where: {
        blockerId: self.user.id,
      },
      select: {
        blockedId: true,
      },
    });
    const excludedUserIds = [
      ...followersIds.map((follower) => follower.followingId),
      ...blockedIds.map((blocked) => blocked.blockerId),
      ...blockingIds.map((blocked) => blocked.blockedId),
    ];
    users = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: self.user.id,
            },
          },
          {
            id: {
              notIn: excludedUserIds,
            },
          },
        ],
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
