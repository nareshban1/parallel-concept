"use client";
import { ConfigProvider, Flex } from "@repo/ui";
import { ReactNode } from "react";

const ConfigWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 0,
          },
        }}
      >
        <Flex
          justify="center"
          align="center"
          style={{
            minHeight: "100vh",
            backgroundColor: "#f0f2f5",
          }}
        >
          {children}
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default ConfigWrapper;
