"use server";

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
  console.log("Creating workspace...", { imageUrl, name, slug, inviteCode });
};
