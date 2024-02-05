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
        { message: "Cannot unblock yourself" },
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

    if (!userAndBlock?.blockedBy.length) {
      return NextResponse.json(
        { block: null, message: `Not blocked` },
        { status: 200 }
      );
    }

    const unblock = await prisma.block.delete({
      where: {
        blockerId_blockedId: {
          blockerId: self.user.id,
          blockedId: userAndBlock.id,
        },
      },
      select: {
        blocked: true,
      },
    });

    return NextResponse.json({
      data: unblock,
      status: 200,
      message: `You unblocked ${unblock.blocked.username}`,
    });
  } catch (error) {
    console.log("[UNBLOCK_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
