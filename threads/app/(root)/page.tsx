import { currentUser } from "@clerk/nextjs/server";

import { getThreads } from "@/lib/actions/thread.actions";
import { ThreadCard } from "@/components/cards/thread-card";

export default async function Home() {
  const result = await getThreads(1, 10);
  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Threads</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.threads.length === 0 && (
          <p className="no-result">No threads found</p>
        )}

        {result.threads.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={user?.id || ""}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        ))}
      </section>
    </>
  );
}
