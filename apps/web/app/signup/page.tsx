"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React, { useLayoutEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
const signUpValidationSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  email: z
    .string({
      required_error: "Please enter a valid email",
    })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must not be longer than 16 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[\W_]/.test(password), {
      message: "Password must contain at least one symbol",
    }),
  testFields: z.array(
    z.object({
      name: z.string(),
    })
  ),
});
import { useFieldArray } from "react-hook-form";

type ValidationSchema = z.infer<typeof signUpValidationSchema>;
const page = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(signUpValidationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "testFields",
    control,
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    fetch("http://0.0.0.0:8080/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        reset();
        router.replace("/login");
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
          <label>Username</label>
          <div>
            <input {...register("username")} className="border rounded" />
          </div>
          {errors.username && (
            <span className="text-sm text-red-600">
              {errors.username.message}
            </span>
          )}
        </div>
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
            Sign Up
          </button>
        </div>
      </form>

      <p>Field Array Test</p>
      <div className="flex flex-col">
        {fields.map((field, index) => (
          <input
            key={field.id}
            {...register(`testFields.${index}.name`)}
            className="my-1"
          />
        ))}
      </div>
      <button
        type="button"
        className="p-1 bg-red-300"
        onClick={() => {
          append({ name: "test" });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default page;
