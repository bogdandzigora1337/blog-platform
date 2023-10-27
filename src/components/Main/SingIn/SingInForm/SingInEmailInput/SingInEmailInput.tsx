import React from "react";

import { useFormContext } from "react-hook-form";

import cl from "../SingInForm.module.scss";

import InputField from "../../../Form/InputField/InputField";

type FormDataType = {
  email: string;
  password: string;
};

type ErrorType = {
  logToAccountReducer: {
    error: string | { errors: { "email or password": string } };
  };
};

type SingInEmailInputProps = {
  errorType: string | false | null;
  error: ErrorType["logToAccountReducer"]["error"];
};

const SingInEmailInput: React.FC<SingInEmailInputProps> = ({
  errorType,
  error,
}) => {
  const { register, formState } = useFormContext<FormDataType>();
  const { errors } = formState;

  return (
    <div className={cl["sing-in__item"]}>
      <InputField
        label="Email address"
        type="text"
        name="email"
        register={register}
        errors={errors}
        serverRequestError={errorType}
        placeholder="Email address"
        pattern={{
          value: /^\S+@\S+$/i,
          message: "The email address must contain the @ symbol",
        }}
        validate={(value: string) => {
          if (!/^[a-z0-9.@]+$/.test(value)) {
            return "Email should be in lowercase";
          }
          return true;
        }}
      />
      {errorType && typeof error === "object" && "errors" in error && (
        <p className={cl["error-text"]}>
          {"Email or password: " + error.errors["email or password"]}
        </p>
      )}
    </div>
  );
};

export default SingInEmailInput;
