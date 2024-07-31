import { NextResponse } from "next/server";

import { addFriendSchema } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendSchema.parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const RESTResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const { result } = (await RESTResponse.json()) as { result: string | null };

    if (!result) {
      return new NextResponse("This person does not exist.", { status: 400 });
    }

    if (result === session.user.id) {
      return new NextResponse("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    return NextResponse.json({ message: "ok" });
  } catch (error: any) {
    throw new NextResponse(`Something went wrong: ${error.message}`, {
      status: 500,
    });
  }
}
