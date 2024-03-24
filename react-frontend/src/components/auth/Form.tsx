import { useState } from "react";
import {
  FieldError,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import toast from "react-hot-toast";
// import { APIERROR } from '../../api/apiTypes';
import InputWithValidation from "../util/InputWithValidation";
import { useAuth } from "../../hooks/useAuth";
import { DataUser } from "./Welcome";
import { useNavigate } from "react-router-dom";

interface Props {
  register: UseFormRegister<DataUser>;
  errors: FieldErrors<DataUser>;
  handleSubmit: UseFormHandleSubmit<DataUser, undefined>;
  type: "LOGIN" | "SIGNUP";
  loading: boolean;
}

function Form({ register, handleSubmit, errors, loading, type }: Props) {
  const [error, setError] = useState<string>("");

  const { useRegisterUser, useLoginUser } = useAuth();

  const navigate = useNavigate();

  const funSubmit = async (formData: DataUser) => {
    try {
      if (type === "SIGNUP") {
        await useRegisterUser(formData);
        toast("Your account is created!");
        navigate("/project");
      } else {
        await useLoginUser(formData);
        toast("You have logged in!");
        navigate("/project");
      }
    } catch (error) {
      toast("Error!");
    }
  };

  return (
    <form onSubmit={handleSubmit(funSubmit)}>
      <div className="flex flex-col gap-y-4">
        <InputWithValidation
          label="Email"
          register={register("email", {
            required: { value: true, message: "email must not be empty" },
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "please provide a valid email",
            },
          })}
          error={errors.email as FieldError}
          inputClass="border-gray-500"
          placeholder="user@gmail.com"
          autoFocus
          animationsInput="animate-slideLeft"
          animationsLabel="animate-slideRight"
        />
        {type === "SIGNUP" && (
          <InputWithValidation
            label="Username"
            register={register("username", {
              required: { value: true, message: "username must not be empty" },
              minLength: {
                value: 2,
                message: "must be at least two characters long",
              },
              pattern: {
                value: /^[A-Za-z0-9_]+$/g,
                message: "username can be a-z,A-Z,0-9,_",
              },
            })}
            error={errors.username as FieldError}
            inputClass="border-gray-500"
            placeholder="username"
            animationsInput="animate-slideLeft"
            animationsLabel="animate-slideRight"
          />
        )}
        <InputWithValidation
          label="Password"
          register={register("pwd", {
            required: { value: true, message: "password must not be empty" },
            minLength: {
              value: 4,
              message: "must be at least 4 characters long",
            },
            maxLength: { value: 14, message: "must be under 15 characters" },
          })}
          error={errors.pwd as FieldError}
          inputClass="border-gray-500"
          type="password"
          placeholder="password"
          animationsInput="animate-slideLeft"
          animationsLabel="animate-slideRight"
        />
        {type === "SIGNUP" && (
          <InputWithValidation
            label="Confirm Password"
            register={register("repeatPwd")}
            error={errors.repeatPwd as FieldError}
            inputClass="border-gray-500"
            placeholder="repeatPwd"
            animationsInput="animate-slideLeft"
            animationsLabel="animate-slideRight"
          />
        )}
      </div>
      {error && <span className="mt-3 block text-red-400">{error}</span>}
      <hr className="mt-3 border-t-[.5px] border-gray-400" />
      <span className="mt-6 block text-[12px] text-gray-600">
        By clicking below, you agree to the our
        <span className="text-blue-800"> Privacy Policy.</span>
      </span>
      <button type="submit" className="btn mt-4 w-full bg-[#321898] py-2">
        {type === "SIGNUP"
          ? loading
            ? "registering ..."
            : "Join now"
          : loading
          ? "logging in ..."
          : "Log In"}
      </button>
    </form>
  );
}

export default Form;
