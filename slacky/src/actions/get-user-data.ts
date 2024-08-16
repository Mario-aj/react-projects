import { supabaseServerClient } from "@/supabase/supabaseServer";
import { User } from "@/types/app";

export async function getUserData(): Promise<User | null> {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("[NO_USER]", user);

    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.log("ERROR TO GET USER INFO", error);
    return null;
  }

  return data ? data[0] : null;
}
