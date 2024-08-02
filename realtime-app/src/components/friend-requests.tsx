"use client";

import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

export const FriendRequests = ({
  sessionId,
  incomingFriendRequests,
}: Props) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const acceptFriend = async (senderId: string) => {
    try {
      await axios.post("/api/requests/accept", { id: senderId });

      setFriendRequests((prev) =>
        prev.filter((req) => req.senderId !== senderId)
      );

      router.refresh();
    } catch (error) {
      toast.error("Somthing went wront while accept the friend request");
    }
  };

  const denyFriend = async (senderId: string) => {
    try {
      await axios.post("/api/requests/deny", { id: senderId });

      setFriendRequests((prev) =>
        prev.filter((req) => req.senderId !== senderId)
      );

      router.refresh();
    } catch (error) {
      toast.error("Somthing went wrong while deny the friend request");
    }
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">No friend requests</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex gap-4 items-center">
            <UserPlus className="text-black" />

            <p className="font-semibold text-lg">{request.senderEmail}</p>

            <button
              onClick={() => denyFriend(request.senderId)}
              aria-label="accept friend"
              className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <Check className="font-semibold text-white w-3/4 h-3/4" />
            </button>

            <button
              onClick={() => denyFriend(request.senderId)}
              aria-label="accept friend"
              className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <X className="font-semibold text-white w-3/4 h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};
