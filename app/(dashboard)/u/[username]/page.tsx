import { getSelfByUsername } from "@/actions/auth-service";
import { StreamPlayer } from "@/components/shared/stream-player";
import { notFound } from "next/navigation";

interface CreatorPageProps {
  params: {
    username: string;
  };
}
export default async function CreatorPage({ params }: CreatorPageProps) {
  const user = await getSelfByUsername(params.username);

  if (user.error) {
    return notFound();
  }
  return (
    <div>
      <StreamPlayer user={user.user!} isFollowing />
    </div>
  );
}
