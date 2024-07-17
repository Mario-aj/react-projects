"use server";

import { revalidatePath } from "next/cache";

import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export const createThread = async ({
  text,
  communityId,
  author,
  path,
}: Params) => {
  try {
    await connectToDB();

    const thread = await Thread.create({
      text,
      author,
      community: null,
    });

    // update user model

    await User.findByIdAndUpdate(author, {
      $push: { threads: thread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
};
