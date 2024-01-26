import { Card } from "@repo/ui";
import React, { ReactNode } from "react";
const AgentsSlotLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Card>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-semibold text-red-500">Agents</p>
      </div>
      <div className="flex-grow overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden z-999">
          {children}
        </div>
      </div>
    </Card>
  );
};

export default AgentsSlotLayout;
