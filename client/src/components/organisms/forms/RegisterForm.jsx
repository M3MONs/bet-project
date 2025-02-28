import React from "react";
import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { registerRequest } from "@/services/authService";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

const RegisterFormSchema = z
  .object({
    email: z.string().email().max(254),
    username: z
      .string()
      .nonempty()
      .max(150)
      .regex(/^[\w.@+-]+$/, { message: "Letters, digits and @/./+/-/_ only." }),
    password: z.string().nonempty().max(128),
    repeatPassword: z.string().nonempty().max(128),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

const fields = [
  { name: "email", label: "Email", placeholder: "Email", type: "email", autoComplete: "email" },
  { name: "username", label: "Username", placeholder: "Login", type: "text", autoComplete: "username" },
  { name: "password", label: "Password", placeholder: "Password", type: "password", autoComplete: "password" },
  { name: "repeatPassword", label: "Repeat Password", placeholder: "Password", type: "password", autoComplete: "repeat-password" },
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data, setError) => {
    try {
      await registerRequest(data);
      toast({ title: "Success", description: "Account created successfully" });
      navigate("/login");
    } catch (err) {
      const errors = err.response.data;
      Object.keys(errors).forEach((field) => {
        setError(field, { type: "manual", message: errors[field][0] });
      });
    }
  };

  return <DynamicForm schema={RegisterFormSchema} fields={fields} onSubmit={onSubmit} submitBtnText="Register" />;
};

export default RegisterForm;
