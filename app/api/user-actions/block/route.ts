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
        { message: "Cannot Block yourself" },
        { status: 200 }
      );
    }

    const userAndBlock = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        blockedBy: {
          where: {
            blockerId: self.user.id,
          },
        },
      },
    });

    if (!userAndBlock) {
      return new NextResponse(null, { status: 404 });
    }

    if (userAndBlock?.blockedBy.length) {
      return NextResponse.json(
        { block: null, message: `Already Blocked` },
        { status: 200 }
      );
    }

    const block = await prisma.block.create({
      data: {
        blockerId: self.user.id,
        blockedId: userAndBlock.id,
      },
      select: {
        blocked: true,
      },
    });

    return NextResponse.json({
      data: block,
      status: 201,
      message: `You blocked ${block.blocked.username}`,
    });
  } catch (error) {
    console.log("[BLOCK_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
