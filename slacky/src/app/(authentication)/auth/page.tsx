"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsSlack } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { z } from "zod";

import { Typography } from "@/components/ui/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { supabaseBrowserClient } from "@/supabase/supabaseClient";
import { registerWithEmail } from "@/actions/regiter-with-email";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, { message: "email must have at least 2 characters" }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    setIsAuthenticating(true);

    const { data, error } = await registerWithEmail(values);

    setIsAuthenticating(false);
  }

  async function socialAuth(provider: Provider) {
    try {
      setIsAuthenticating(true);

      await supabaseBrowserClient.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Sclaky" variants="h2" />
        </div>

        <Typography
          text="Sign in to your Slacky account"
          variants="h2"
          className="mb-3"
        />

        <Typography
          text="We suggest using the email address ythat you use at work."
          variants="p"
          className="opacity-90 mb-7"
        />

        <div className="flex flex-col space-y-4">
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-6 border-2 flex space-x-3"
            onClick={() => socialAuth("google")}
          >
            <FcGoogle size={30} />
            <Typography
              text="Sign in with Google"
              className="text-xl"
              variants="p"
            />
          </Button>

          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-6 border-2 flex space-x-3"
            onClick={() => socialAuth("github")}
          >
            <RxGithubLogo size={30} />
            <Typography
              text="Sign in with Github"
              className="text-xl"
              variants="p"
            />
          </Button>
        </div>

        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variants="p" />
            <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticating}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name@work-email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                  variant="secondary"
                  type="submit"
                >
                  <Typography text="Sign in with Email" variants="p" />
                </Button>

                <div className="px-5 py-4 bf-gray-100 rounded-sm">
                  <div className="text-gray-500 flex items-center space-x-3">
                    <MdOutlineAutoAwesome size={30} />
                    <Typography
                      text="We will email you a magic link for a password-free sign-in"
                      variants="p"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
