"use client";

import { Card, Flex, Space, Typography } from "@repo/ui";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Page(): JSX.Element {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  // useLayoutEffect(() => {
  //   if (!token) router.replace("/login");
  // }, [token]);

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
      <main
        style={{
          padding: "1rem",
          width: "100%",
        }}
      >
        <Typography.Title level={2}>Tasks</Typography.Title>
        <Space
          direction="vertical"
          style={{
            width: "50%",
          }}
        >
          {tasks?.map((task: any) => (
            <Card
              title={
                <>
                  <Flex justify="space-between" align="center">
                    <Typography.Text>{task.taskName}</Typography.Text>
                    <Typography.Text type="secondary">
                      <>{new Date(task.UpdatedAt).toDateString()}</>
                    </Typography.Text>
                  </Flex>
                </>
              }
              key={task.ID}
            >
              <Space direction="vertical">
                {task.taskDescription}
                <Typography.Text strong>
                  Assigned to: {task.User ? task.User.userName : "Unassigned"}
                </Typography.Text>
              </Space>
            </Card>
          ))}
        </Space>
      </main>
    </>
  );
}
