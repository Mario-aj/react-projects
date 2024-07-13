"use client";

import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const name = user.firstName + " " + user.lastName;

    (async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await res.json();

        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />

        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      connect
      token={token}
      video={video}
      audio={audio}
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
