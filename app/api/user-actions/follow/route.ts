import { NextRequest, NextResponse } from "next/server";
import { getSelf } from "@/actions/auth-service";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const self = await getSelf();
    const { id } = await req.json();

    if (!self.user) {
      return new NextResponse("Not login", { status: 401 });
    }

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (self.user.id === otherUser.id) {
      return NextResponse.json(
        { follow: null, message: `Cannot follow yourself` },
        { status: 200 }
      );
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.user.id,
        followingId: otherUser.id,
      },
    });

    if (existingFollow) {
      return NextResponse.json(
        { follow: null, message: `Already following` },
        { status: 200 }
      );
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
    return NextResponse.json(
      { follow, message: `You are now following ${follow.following.username}` },
      { status: 201 }
    );
  } catch (error) {
    console.log("[FOLLOW_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
