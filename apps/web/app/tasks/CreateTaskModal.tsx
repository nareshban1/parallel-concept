"use client";
import { FileAddOutlined } from "@ant-design/icons";
import { FloatButton, Form, Input, Modal, Select } from "@repo/ui";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import useAuth from "../../src/hooks/useAuth";

type CreateTaskSchema = {
  taskName: string;
  taskDescription: string;
  userId: string;
};

const CreateTaskModal = ({
  revalidateTasks,
}: {
  revalidateTasks: () => void;
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [form] = Form.useForm<CreateTaskSchema>();

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const { token } = useAuth();

  const getAllUsers = async () => {
    try {
      fetch("http://0.0.0.0:8080/users", {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token") || "",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUsers(data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) getAllUsers();
  }, [token]);

  const handleSubmit = (values: CreateTaskSchema) => {
    console.log(values);
    fetch("http://0.0.0.0:8080/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token || "",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        revalidateTasks();
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const userOptions = useMemo(() => {
    return users.map((user: any) => {
      return {
        value: user.ID,
        label: user.userName,
      };
    });
  }, [users]);

  return (
    <>
      <FloatButton
        tooltip="Create New Task"
        onClick={() => (token ? showModal() : router.push("/login"))}
      >
        <FileAddOutlined />
      </FloatButton>

      <Modal
        title="Create New Task"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Create Task"}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ minWidth: 300, maxWidth: 600 }}
        >
          <Form.Item
            name={"taskName"}
            label="Task Name"
            rules={[
              {
                required: true,
                message: "Task Name is required!",
              },
            ]}
          >
            <Input placeholder="Task Name" />
          </Form.Item>
          <Form.Item
            name="taskDescription"
            label="Task Description"
            rules={[
              {
                required: true,
                message: "Task Description is required!",
              },
            ]}
          >
            <Input.TextArea placeholder="Task Description" />
          </Form.Item>
          <Form.Item name={"userId"} label="Assigned To">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={filterOption}
              options={userOptions}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
