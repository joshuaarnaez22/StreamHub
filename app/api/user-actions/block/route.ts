import { NextRequest, NextResponse } from "next/server";
import { getSelf } from "@/actions/auth-service";
import prisma from "@/lib/prisma";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

export async function POST(req: NextRequest) {
  try {
    const self = await getSelf();
    const { id } = await req.json();

    try {
      if (self.user) {
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

        await roomService.removeParticipant(self.user.id, id);
        return NextResponse.json({
          data: block,
          status: 200,
          message: `You blocked ${block.blocked.username}`,
        });
      }
    } catch (error) {
      console.log("Guest user");
    }

    try {
      if (self.user) await roomService.removeParticipant(self.user.id, id);
      return NextResponse.json({
        status: 200,
        message: `You blocked a guest`,
      });
    } catch {
      // This means user is not in the room
    }
  } catch (error) {
    console.log("[BLOCK_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
