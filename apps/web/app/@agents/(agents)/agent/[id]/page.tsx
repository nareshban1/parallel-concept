import Image from "next/image";
import React from "react";
const getAgentDetail = async (id: string) => {
  "use server";
  const { signal } = new AbortController();
  const res = await fetch(`https://valorant-api.com/v1/agents/${id}`, {
    signal,
  });
  const data = await res.json();
  return data;
};
const AgentDetail = async ({
  params: { id },
}: Readonly<{
  params: { id: string };
}>) => {
  const agentDetail = await getAgentDetail(id);
  return (
    <div className="flex flex-col items-center">
      <Image
        src={agentDetail.data.fullPortrait}
        height={500}
        width={500}
        alt={agentDetail.data.displayName}
      />
      <h1 className="text-red-500 font-bold text-3xl">
        {agentDetail.data.displayName}
      </h1>
    </div>
  );
};

export default AgentDetail;
