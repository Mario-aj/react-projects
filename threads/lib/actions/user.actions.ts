'use server'

import { revalidatePath } from 'next/cache'

import User from '@/lib/models/user.model'
import { connectToDB } from '@/lib/mongoose'
import Thread from '../models/thread.model'

interface Params {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}

export default async function updateUser ({
  userId,
  username,
  name,
  bio,
  image,
  path
}: Params): Promise<void> {
  try {
    await connectToDB()

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true
      },
      { upsert: true } // update if the data already exists, otherwise, insert it.
    )

    if (path === '/profile/edit') {
      revalidatePath(path)
    }
  } catch (error: any) {
    console.log(`Failed to create/update user: ${error.message}`)
  }
}

export async function fetchUser (userId: string) {
  try {
    await connectToDB()

    return await User.findOne({ id: userId })
    // .populate({
    //   path: "communities",
    //   model: Community,
    // });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}

export async function fetchUserThreads (userId: string) {
  try {
    await connectToDB()

    const threads = await User.findOne({ id: userId })
      .populate({
        path: 'threads',
        model: Thread,
        populate: {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'name image id'
          }
        }
      })
      .exec()

    return threads
  } catch (error: any) {
    throw new Error(`Failed to fetch user threads: ${error.message}`)
  }
}
