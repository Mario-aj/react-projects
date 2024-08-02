"use client";

import Link from "next/link";
import { useState } from "react";
import { User } from "lucide-react";

interface Props {
  sessionId: string;
  initialUnseenRequestsCount: number;
}

export const FriendRequestOptions = ({
  sessionId,
  initialUnseenRequestsCount,
}: Props) => {
  const [unseenRequestsCount, setUnseenRequestsCount] = useState(
    initialUnseenRequestsCount
  );

  return (
    <Link
      href="/dashboard/requests"
      className="text-gray-700 hover:text-indigo-600 font-semibold hover:bg-gray-50 group flex items-center gap-x-3 rounded-md text-sm leading-6 p-2"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 items-center justify-center shrink-0 rounded-lg border text-[0.625rem] font-semibold bg-white">
        <User className="h-4 w-4" />
      </div>

      <p className="truncate">Friend requests</p>

      {unseenRequestsCount > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600">
          {unseenRequestsCount}
        </div>
      ) : null}
    </Link>
  );
};
