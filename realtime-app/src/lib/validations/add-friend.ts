import * as z from "zod";

export const addFriendSchema = z.object({
  email: z
    .string({ message: "required field" })
    .email({ message: "invalid e-mail" }),
});
