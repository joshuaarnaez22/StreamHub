import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headerPayload = headers();

    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
      return new Response("No Authorization header", {
        status: 400,
      });
    }

    const event = receiver.receive(body, authorization);
    console.log(event.event);

    if (event.event === "ingress_ended") {
      await prisma.stream.update({
        where: {
          userId: event.ingressInfo?.participantIdentity,
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        },
      });
    }

    if (event.event === "ingress_started") {
      await prisma.stream.update({
        where: {
          userId: event.ingressInfo?.participantIdentity,
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        },
      });
    }
    return new Response("OK", {
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
