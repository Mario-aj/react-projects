import { NextResponse } from "next/server";

import { addFriendSchema } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendSchema.parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const RESTResponse = await fetch(
    //   `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    //     },
    //     cache: "no-store",
    //   }
    // );

    // const { result } = (await RESTResponse.json()) as { result: string | null };

    const userIdToAdd = await fetchRedis("get", `user:email:${emailToAdd}`);

    if (!userIdToAdd) {
      return new NextResponse("This person does not exist.", { status: 400 });
    }

    if (userIdToAdd === session.user.id) {
      return new NextResponse("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    const isAlreadyAdd = await fetchRedis(
      "sismember",
      `user:${userIdToAdd}:incoming_friend_requests`,
      session.user.id
    );

    if (isAlreadyAdd) {
      return new NextResponse("Already added this user", { status: 400 });
    }

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      userIdToAdd
    );

    if (isAlreadyFriends) {
      return new NextResponse("You are already friends.", { status: 400 });
    }

    // send friend request
    db.sadd(`user:${userIdToAdd}:incoming_friend_requests`, session.user.id);

    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request payload", { status: 422 });
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}
