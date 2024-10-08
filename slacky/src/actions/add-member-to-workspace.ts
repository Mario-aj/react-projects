"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";

export const addMemberToWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase.rpc("add_member_to_workspace", {
    user_id: userId,
    workspace_id: workspaceId,
  });

  return [data, error];
};
