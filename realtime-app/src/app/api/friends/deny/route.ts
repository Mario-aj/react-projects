import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { id: idToDeny } = z.object({ id: z.string() }).parse(body);

    await db.srem(
      `user:${session.user.id}:incomming_friend_requests`,
      idToDeny
    );

    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalide request payload", { status: 422 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
