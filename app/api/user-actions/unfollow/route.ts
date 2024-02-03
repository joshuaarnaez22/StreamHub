import { NextRequest, NextResponse } from "next/server";
import { getSelf } from "@/actions/auth-service";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const self = await getSelf();
    const { id } = await req.json();

    if (!self.user) {
      return new NextResponse(null, { status: 404 });
    }

    if (id === self.user.id) {
      return NextResponse.json(
        { message: "Cannot unfollow yourself" },
        { status: 200 }
      );
    }

    const userAndFollow = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,

        followingUsers: {
          where: {
            followerId: self.user.id,
          },
        },
      },
    });
    if (!userAndFollow) {
      return new NextResponse(null, { status: 404 });
    }

    if (!userAndFollow?.followingUsers.length) {
      return NextResponse.json(
        { follow: null, message: `Your are not following this user` },
        { status: 200 }
      );
    }

    const follow = await prisma.follow.delete({
      where: {
        id: userAndFollow.followingUsers[0].id,
      },
      include: {
        following: true,
      },
    });
    return NextResponse.json(
      {
        follow,
        message: `You are now unfollowing ${follow.following.username}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("[FOLLOW_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
