import { Card } from "@repo/ui";
import React, { ReactNode } from "react";
const AgentsSlotLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Card>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-semibold text-red-500">Agents</p>
      </div>
      {children}
    </Card>
  );
};

export default AgentsSlotLayout;
