"use client";

import { ButtonHTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

import { Button } from "./ui/button";
import { Loader2, LogOut } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SignOutButton = ({ ...props }: Props) => {
  const [isSigningOut, setIsSigninOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigninOut(false);

      await signOut();
    } catch (error: any) {
      toast.error("There was a problem signing out");
    } finally {
      setIsSigninOut(false);
    }
  };

  return (
    <Button {...props} varint="ghost" onClick={handleSignOut}>
      {isSigningOut ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};
