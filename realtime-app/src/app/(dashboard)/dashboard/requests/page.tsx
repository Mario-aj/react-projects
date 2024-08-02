import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { FriendRequests } from "@/components/friend-requests";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const result = (await fetchRedis("get", `user:${senderId}`)) as string;
      const sender = JSON.parse(result) as User;

      return {
        senderId,
        senderEmail: sender.email,
      };
    })
  );

  return (
    <main className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>

      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={JSON.parse(
            JSON.stringify(incomingFriendRequests)
          )}
          sessionId={JSON.parse(JSON.stringify(session.user.id))}
        />
      </div>
    </main>
  );
}
