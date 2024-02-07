"use client";
import { Button, ConfigProvider, Flex, Space } from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";
import useAuth from "../src/hooks/useAuth";
const ConfigWrapper = ({ children }: { children: ReactNode }) => {
  const { token, isLoading } = useAuth();
  const currentPathName = usePathname();
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
          style={{
            minHeight: "100vh",
            backgroundColor: "#f0f2f5",
          }}
          vertical
        >
          <Flex
            align="center"
            justify="flex-end"
            style={{
              padding: "1rem",
            }}
          >
            {!isLoading &&
            !token &&
            !currentPathName.includes("login") &&
            !currentPathName.includes("signup") ? (
              <Space>
                <Link href={"/login"}>
                  <Button type="primary">Login</Button>
                </Link>
                <Link href={"/signup"}>
                  <Button type="primary">Sign Up</Button>
                </Link>
              </Space>
            ) : null}
          </Flex>
          {children}
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default ConfigWrapper;
