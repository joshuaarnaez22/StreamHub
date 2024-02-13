"use server";

import {
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  type CreateIngressOptions,
  RoomServiceClient,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import prisma from "@/lib/prisma";
import { getSelf } from "../auth-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  if (!self.user) {
    throw new Error("Not found");
  }
  await resetIngresses(self.user?.id!);

  const options: CreateIngressOptions = {
    name: self.user.username,
    roomName: self.user.id,
    participantName: self.user.username,
    participantIdentity: self.user.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient
    .createIngress(ingressType, options)
    .catch((e) => {
      console.log(e);
    });

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Could not create ingress");
  }

  await prisma.stream.update({
    where: {
      userId: self.user.id,
    },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.user?.username}/keys`);
  return ingress;
};

export async function resetIngresses(hostIdentity: string) {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }
  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}
