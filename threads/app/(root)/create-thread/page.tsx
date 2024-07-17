import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { fetchUser } from "@/lib/actions/user.actions";
import { PostThread } from "@/components/form/post-thread";

export default async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) return redirect("/onborading");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={JSON.parse(JSON.stringify(userInfo?._id))} />
    </>
  );
}
