import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSelf } from "@/actions/auth-service";
export async function PUT(req: NextRequest) {
  try {
    const values = await req.json();

    const self = await getSelf();
    if (!self.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.user.update({
      where: {
        id: self.user.id,
      },
      data: {
        ...values,
      },
    });

    return new NextResponse("Ok", { status: 200 });
  } catch (error) {
    console.log("[UPDATE_USER_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
