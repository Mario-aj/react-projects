import { currentUser } from "@clerk/nextjs/server";

import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { ThreadCard } from "@/components/cards/thread-card";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { Comment } from "@/components/form/comment";

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();

  if (!user?.id) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) return redirect("/onborading");

  const thread = await fetchThreadById(params.id);

  if (!thread) return null;

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={JSON.parse(JSON.stringify(thread._id))}
          currentUserImage={JSON.parse(JSON.stringify(userInfo?.image))}
          currentUserId={JSON.parse(JSON.stringify(userInfo?._id))}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((comment: any) => (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUserId={user?.id || ""}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}
