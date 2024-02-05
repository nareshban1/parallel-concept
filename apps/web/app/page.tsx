"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Page(): JSX.Element {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  useLayoutEffect(() => {
    if (!token) router.replace("/login");
  }, [token]);

  const loadTasks = () => {
    fetch("http://0.0.0.0:8080/tasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <>
      {token ? (
        <main>
          <>This is home page</>
          <button
            type="button"
            onClick={() => {
              throw new Error("Sentry Frontend Error");
            }}
          >
            Throw error
          </button>
          <section>
            <h2>Tasks</h2>
            <div className="flex flex-col">
              {tasks?.map((task: any) => (
                <div className="p-2 border rounded my-2">{task.taskName}</div>
              ))}
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
}
