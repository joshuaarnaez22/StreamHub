import { NextRequest, NextResponse } from "next/server";
import { getSelf } from "@/actions/auth-service";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const self = await getSelf();
    const values = await req.json();

    if (!self.user) {
      return new NextResponse(null, { status: 404 });
    }

    const ownStream = await prisma.stream.findUnique({
      where: {
        userId: self.user.id,
      },
    });

    if (!ownStream) {
      return new NextResponse(null, { status: 404 });
    }

    await prisma.stream.update({
      where: {
        id: ownStream.id,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[TOOGLE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
