"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";
import { updateUserWorkspace } from "./update-user-workspace";
import { addMemberToWorkspace } from "./add-member-to-workspace";

interface Props {
  imageUrl?: string;
  name: string;
  slug: string;
  inviteCode: string;
}

export const createWorkspace = async ({
  inviteCode,
  name,
  slug,
  imageUrl,
}: Props) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  console.log({ userData });

  if (!userData) {
    return { error: "User not found" };
  }

  const { data: workspaceRecord, error } = await supabase
    .from("workspaces")
    .insert({
      invite_code: inviteCode,
      name,
      slug,
      image_url: imageUrl,
      super_admin: userData.id,
    })
    .select("*");

  if (error) {
    return { error };
  }

  const [, updateWorkspaceError] = await updateUserWorkspace(
    userData.id,
    workspaceRecord[0].id
  );

  if (updateWorkspaceError) {
    return { error: updateWorkspaceError };
  }

  // Add user to workspace members
  const [, addMemberToWorkspaceError] = await addMemberToWorkspace(
    userData.id,
    workspaceRecord[0].id
  );

  if (addMemberToWorkspaceError) {
    return { error: addMemberToWorkspaceError };
  }
};
