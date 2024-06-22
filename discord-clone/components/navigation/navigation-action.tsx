"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const onOpenModal = useModal((store) => store.onOpen);

  return (
    <div>
      <ActionTooltip align="center" side="right" label="Add a server">
        <button className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
              onClick={() => onOpenModal("createServer")}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
