import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ServerSidebar } from "@/components/server/server-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

interface MobileToggleProps {
  serverId: string;
}

export const MobileToggle = ({ serverId }: MobileToggleProps) => {
  console.log({ serverId });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>

        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};
