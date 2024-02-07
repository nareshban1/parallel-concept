"use client";

import { Button, Flex, Form, Input, Space, Typography } from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

interface FormSchema {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormSchema>();
  const handleSubmit = (values: FormSchema) => {
    fetch("http://0.0.0.0:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        router.replace("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useLayoutEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) router.replace("/");
  }, []);

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        width: "100%",
      }}
    >
      <Space direction="vertical">
        <Typography.Title level={2}>Log In</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ minWidth: 300, maxWidth: 300 }}
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Email is required!",
              },
              {
                type: "email",
                message: "Email is not valid",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form>
        <Typography.Text>
          Don't have an account? <Link href={"/signup"}>Sign Up</Link>
        </Typography.Text>
      </Space>
    </Flex>
  );
};

export default Login;
