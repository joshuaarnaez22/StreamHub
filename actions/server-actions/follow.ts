"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSelf } from "../auth-service";
// import { revalidatePath } from "next/cache";
// import { followUser, unfollowUser } from "../follow-service";

// export const onFollow = async (id: string) => {
//   try {
//     const { following } = await followUser(id);

//     revalidatePath("/");

//     if (!following) throw Error("Could not follow user");

//     revalidatePath(`${following.username}`);

//     return following;
//   } catch (error: any) {
//     console.log(error.message);

//     throw new Error("Internal server error");
//   }
// };

// export const onUnfollowUser = async (id: string) => {
//   try {
//     const { following } = await unfollowUser(id);

//     revalidatePath("/");

//     if (!following) throw Error("Could not unfollow user");

//     revalidatePath(`${following.username}`);

//     return following;
//   } catch (error: any) {
//     console.log(error.message);

//     throw new Error("Internal server error");
//   }
// };

export const onFollow = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self.user) {
      return { error: "Unauthorized", follow: null };
    }

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      return { error: "Not found", follow: null };
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.user.id,
        followingId: otherUser.id,
      },
    });

    if (existingFollow) {
      return { error: "Already following", follow: null };
    }
    const follow = await prisma.follow.create({
      data: {
        followerId: self.user.id,
        followingId: otherUser.id,
      },
      include: {
        following: true,
      },
    });

    revalidatePath("/");

    return {
      error: null,
      follow,
    };
  } catch (error: any) {
    console.log(error);

    return { error: "Something went wrong", follow: null };
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self.user) {
      return { error: "Unauthorized", follow: null };
    }

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      return { error: "Not found", follow: null };
    }

    if (self.user.id === otherUser.id) {
      return { error: "Cannot unfollow yourself", follow: null };
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.user.id,
        followingId: otherUser.id,
      },
    });

    if (!existingFollow) {
      return { error: "Not following", follow: null };
    }

    const follow = await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        following: true,
      },
    });

    revalidatePath(`/${follow.following.username}`);
    revalidatePath("/");
    return {
      error: null,
      follow,
    };
  } catch (error: any) {
    return { error: "Something went wrong", follow: null };
  }
};
