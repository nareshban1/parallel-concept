"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const SignUpValidation = z.object({
  userName: z.string({
    required_error: "Please enter your username",
  }),
  email: z
    .string({
      required_error: "Please enter a valid email",
    })
    .email(),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type Inputs = {
  userName: string;
  email: string;
  password: string;
};

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: { userName: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("localhost:8080/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
        <span className="flex flex-col">
          <input {...register("userName")} className="border rounded" />
          {errors.userName && <p>{errors.userName.message}</p>}
        </span>
        <span className="flex flex-col">
          <input {...register("email")} className="border rounded" />
          {errors.email && <p>{errors.email.message}</p>}
        </span>
        <span className="flex flex-col">
          <input {...register("password")} className="border rounded" />
          {errors.password && <p>{errors.password.message}</p>}
        </span>
        <button type="submit" className="border rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
