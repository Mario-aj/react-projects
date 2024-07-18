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

export const getThreads = async (page = 1, limit = 10) => {
  try {
    await connectToDB();

    const skipAmount = (page - 1) * limit;

    const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id username parentId image",
        },
      });

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const threads = await threadsQuery.exec();

    const hasNext = totalThreadsCount > skipAmount + threads.length;

    return {
      threads,
      hasNext,
    };
  } catch (error: any) {
    throw new Error(`Error fetching threads: ${error.message}`);
  }
};
