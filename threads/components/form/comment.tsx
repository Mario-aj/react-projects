"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommentValidation } from "@/lib/validations/threads";
import Image from "next/image";
import { addThreadComment } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserId: string;
  currentUserImage: string;
}

export const Comment = ({
  threadId,
  currentUserId,
  currentUserImage,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    await addThreadComment({
      commentText: values.thread,
      userId: currentUserId,
      threadId: threadId,
      path: pathname,
    });

    form.reset();
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          name="thread"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full items-center">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent">
                <Input
                  placeholder="Write a comment..."
                  className="no-focus text-light-1 outline-none"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn" disabled={isLoading}>
          Reply
        </Button>
      </form>
    </Form>
  );
};
