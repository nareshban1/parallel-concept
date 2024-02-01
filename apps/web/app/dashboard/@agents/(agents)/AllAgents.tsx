import Image from "next/image";
import Link from "next/link";

const getAllAgents = async () => {
  "use server";
  const { signal } = new AbortController();
  const res = await fetch("https://valorant-api.com/v1/agents", { signal });
  const data = await res.json();
  return data;
};
const AllAgents = async () => {
  const allAgents = await getAllAgents();

  return (
    <>
      <div className="flex  flex-wrap gap-3 py-3">
        {allAgents?.data
          ?.filter((agent: any) => agent.isPlayableCharacter)
          .map((agent: any) => (
            <Link
              className="interactable flex group flex-col items-start w-auto p-2 h-60 my-1 hover:bg-red-500 cursor-pointer "
              href={`agent/${agent.uuid}`}
              key={agent.uuid}
            >
              <Image
                src={agent.displayIcon}
                height={200}
                width={200}
                alt={agent.displayName}
              />
              <h3 className="font-semibold text-lg text-red-500 group-hover:text-white">
                {agent.displayName}
              </h3>
            </Link>
          ))}
      </div>
    </>
  );
};

export default AllAgents;
