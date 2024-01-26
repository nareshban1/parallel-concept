import { Card } from "@repo/ui";
import React, { ReactNode } from "react";
const MapsSlotLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Card>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-semibold text-red-500">Maps</p>
      </div>
      {children}
    </Card>
  );
};

export default MapsSlotLayout;
