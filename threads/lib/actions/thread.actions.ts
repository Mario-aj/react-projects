"use server";

import { revalidatePath } from "next/cache";

import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import Thread, { ThreadType } from "@/lib/models/thread.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

interface AddThreadCommentParams {
  threadId: string;
  commentText: string;
  userId: string;
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

    const threads = (await threadsQuery.exec()) as unknown as ThreadType[];

    const hasNext = totalThreadsCount > skipAmount + threads.length;

    return {
      threads,
      hasNext,
    };
  } catch (error: any) {
    throw new Error(`Error fetching threads: ${error.message}`);
  }
};

export async function fetchThreadById(threadId: string) {
  await connectToDB();

  try {
    const thread = (await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name image parentId",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name image parentId",
            },
          },
        ],
      })
      .exec()) as unknown as ThreadType;

    return thread;
  } catch (error: any) {
    throw new Error(`Failed fetching thread by ID: ${error.message}`);
  }
}

export async function addThreadComment({
  threadId,
  commentText,
  userId,
  path,
}: AddThreadCommentParams) {
  await connectToDB();

  try {
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) throw new Error("Thread not found");

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: originalThread._id,
    });

    const savedComment = await commentThread.save();

    originalThread.children.push(savedComment._id);
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding thread comment: ${error.message}`);
  }
}
