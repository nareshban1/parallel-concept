import React from "react";
import AllAgents from "./(agents)/AllAgents";
import { Card } from "@repo/ui";

const AgentsDefault = () => {
  return (
    <>
      <Card>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-semibold text-red-500">Agents</p>
        </div>
        <div className="flex-grow overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden ">
            <AllAgents />
          </div>
        </div>
      </Card>
    </>
  );
};

export default AgentsDefault;
