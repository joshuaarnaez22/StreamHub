"use server";

import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "../auth-service";
import { isBlockedByUser } from "../block-service";
import { getUserById } from "../user-service";
import { v4 } from "uuid";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    const selfUser = await getSelf();
    if (!selfUser.user) {
      throw new Error("Not login proceed");
    }
    self = selfUser;
  } catch (error) {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = {
      user: {
        id,
        username,
      },
    };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found");
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }
  const isHost = self.user?.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.user?.id}` : self.user?.id,
      name: self.user?.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });
  return Promise.resolve(token.toJwt());
};
