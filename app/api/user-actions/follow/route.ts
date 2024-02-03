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
        followUsers: {
          where: {
            followerId: self.user.id,
          },
        },
      },
    });

    if (!userAndFollow) {
      return new NextResponse(null, { status: 404 });
    }

    if (userAndFollow?.followUsers.length) {
      return NextResponse.json(
        { follow: null, message: `Already following` },
        { status: 200 }
      );
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: self.user.id,
        followingId: id,
      },
      include: {
        following: true,
      },
    });
    return NextResponse.json(
      { follow, message: `You are now following ${follow.following.username}` },
      { status: 201 }
    );
  } catch (error) {
    console.log("[FOLLOW_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
