"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React, { useLayoutEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
const validationSchema = z.object({
  email: z
    .string({
      required_error: "Please enter a valid email",
    })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({
      required_error: "Please enter a valid password",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;
const page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    fetch("http://0.0.0.0:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        reset();
        router.replace("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        reset();
      });
  };
  const token = localStorage.getItem("token");
  useLayoutEffect(() => {
    if (token) router.replace("/");
  }, [token]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col">
        <div className="flex flex-col">
          <label>Email</label>
          <div>
            <input {...register("email")} className="border rounded" />
          </div>
          {errors.email && (
            <span className="text-sm text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <div>
            <input {...register("password")} className="border rounded" />
          </div>
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="border rounded w-fit p-1 bg-green-400 text-sm text-white"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
