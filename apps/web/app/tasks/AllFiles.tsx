"use client";

import { Card, Flex, Space, Typography } from "@repo/ui";
import React from "react";
const AllFiles = ({ allTasks }: { allTasks: any }) => {
  return (
    <Flex
      vertical
      style={{
        flexGrow: 1,
        position: "relative",
        height: "100%",
      }}
    >
      <Typography.Title level={2}>Tasks</Typography.Title>
      <Space
        direction="vertical"
        style={{
          width: "50%",
          display: "flex",
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Space
          direction="vertical"
          style={{
            width: " 100%",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            position: "absolute",
            overflow: "auto",
          }}
        >
          {allTasks?.map((task: any) => (
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
                <Space>
                  <Typography.Text>Assigned to:</Typography.Text>
                  <Typography.Text strong>
                    {task.User ? task.User.userName : "Unassigned"}
                  </Typography.Text>
                </Space>
              </Space>
            </Card>
          ))}
        </Space>
      </Space>
    </Flex>
  );
};

export default AllFiles;
