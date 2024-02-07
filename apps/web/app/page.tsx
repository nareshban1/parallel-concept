import { Metadata } from "next";
import AllFiles from "./tasks/AllFiles";
import CreateTaskModal from "./tasks/CreateTaskModal";
import { revalidateTag } from "next/cache";
const getAllAgents = async () => {
  "use server";
  const res = await fetch("http://0.0.0.0:8080/tasks", {
    next: { tags: ["allTasks"] },
  });
  const data = await res.json();
  return data.data;
};

export const metadata: Metadata = {
  title: "Demo Todo App",
  description:
    "This is a demo todo app to learn next js 14 with go backend and ant design and more ",
};
export default async function Page() {
  const allTasks = await getAllAgents();
  const revalidateTasks = async () => {
    "use server";
    revalidateTag("allTasks");
  };
  return (
    <>
      <main
        style={{
          padding: "1rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <AllFiles allTasks={allTasks} />
        <CreateTaskModal revalidateTasks={revalidateTasks} />
      </main>
    </>
  );
}
