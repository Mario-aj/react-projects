import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { UserCard } from "@/components/cards/user-card";

export default async function Page() {
  const currentLoggedUser = await currentUser();

  if (!currentLoggedUser) return null;

  const userInfo = await fetchUser(currentLoggedUser.id);
  if (!userInfo?.onboarded) return redirect("/onboarding");

  const result = await fetchUsers({
    userId: currentLoggedUser.id,
    searchString: "",
    page: 1,
    pageSize: 10,
    sortBy: "desc",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search bar  */}

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                name={user.name}
                username={user.username}
                id={user.id}
                imageUrl={user.image ?? ""}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
