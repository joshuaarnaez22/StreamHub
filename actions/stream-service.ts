import { getSelf } from "./auth-service";
import prisma from "@/lib/prisma";

export const getStreamUser = async () => {
  const self = await getSelf();

  if (!self.user) {
    return null;
  }
  const stream = await prisma.stream.findUnique({
    where: {
      userId: self.user.id,
    },
  });
  return stream;
};
