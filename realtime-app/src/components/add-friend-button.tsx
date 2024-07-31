"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "./ui/button";
import { addFriendSchema } from "@/lib/validations/add-friend";

type FormData = z.infer<typeof addFriendSchema>;

export const AddFriendButton = () => {
  const [showSuccessState, setShowSuccessState] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendSchema),
  });

  const addFriend = async (email: string) => {
    try {
      const { email: validatedEmail } = addFriendSchema.parse({ email });

      await axios.post("/api/friends/add", { email: validatedEmail });

      setShowSuccessState(true);
    } catch (error: any) {
      setShowSuccessState(false);
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error?.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong." });
      toast.error("Something went wrong, while tried to add friend.");
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-mail
      </label>

      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          placeholder="you@exaple.com"
          className="block w-ful rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <Button>Add</Button>
      </div>

      {errors.email?.message && (
        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
      )}

      {showSuccessState && (
        <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
      )}
    </form>
  );
};
