"use client";

import { Button, Flex, Form, Input, Space, Typography } from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

interface FormSchema {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormSchema>();
  const handleSubmit = (values: FormSchema) => {
    fetch("http://0.0.0.0:8080/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        router.replace("/login");
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
    <Flex justify="center" align="center">
      <Space direction="vertical">
        <Typography.Title level={2}>Sign Up</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ minWidth: 300, maxWidth: 600 }}
        >
          <Form.Item
            name={"username"}
            label="Username"
            rules={[
              {
                required: true,
                message: "Username is required!",
              },
              {
                min: 6,
                message: "Username should be at least 6 characters long",
              },
              {
                max: 20,
                message: "Username should be at most 20 characters long",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
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
              {
                message: "Password should be at least 8 characters long",
                min: 8,
              },
              {
                max: 20,
                message: "Password should be at most 20 characters long",
              },
              {
                pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"),
                message:
                  "Password should contain at least one uppercase, one lowercase and one number",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Confirm your password!",
              },
              {
                validator: (_, value) => {
                  if (value !== form.getFieldValue("password")) {
                    return Promise.reject("Passwords do not match!");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form>
        <Typography.Text>
          Already have an account? <Link href={"/login"}>Log in</Link>
        </Typography.Text>
      </Space>
    </Flex>
  );
};

export default SignUp;
