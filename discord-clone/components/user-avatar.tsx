import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface UseraVatarProps {
  src?: string;
  className?: string;
}

export const UserAvatar = ({ src, className }: UseraVatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
