import prisma from "@/lib/prisma";
import { getSelf } from "./auth-service";
import { User } from "@prisma/client";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User not found");

    if (self.id === otherUser.id) return true;

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
};

export const followUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw Error("User not found");
    }

    if (self.id === otherUser.id) {
      throw new Error("Cannot follow yourself");
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    if (existingFollow) {
      throw new Error("Already following");
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: self.id,
        followingId: otherUser.id,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return follow;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const unfollowUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw Error("User not found");
    }

    if (self.id === otherUser.id) {
      throw new Error("Cannot unfollow yourself");
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    if (!existingFollow) {
      throw new Error("Not following");
    }

    const follow = await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        following: true,
      },
    });

    return follow;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
