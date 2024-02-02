"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "../follow-service";

export const onFollow = async (id: string) => {
  try {
    const { following } = await followUser(id);

    revalidatePath("/");

    if (!following) throw Error("Could not follow user");

    revalidatePath(`${following.username}`);

    return following;
  } catch (error: any) {
    console.log(error.message);

    throw new Error("Internal server error");
  }
};

export const onUnfollowUser = async (id: string) => {
  try {
    const { following } = await unfollowUser(id);

    revalidatePath("/");

    if (!following) throw Error("Could not unfollow user");

    revalidatePath(`${following.username}`);

    return following;
  } catch (error: any) {
    console.log(error.message);

    throw new Error("Internal server error");
  }
};
