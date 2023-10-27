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

const SingInPasswordInput: React.FC<SingInEmailInputProps> = ({
  errorType,
  error,
}) => {
  const { register, formState } = useFormContext<FormDataType>();
  const { errors } = formState;
  return (
    <div className={cl["sing-in__item"]}>
      <InputField
        label="Password"
        type="password"
        name="password"
        register={register}
        errors={errors}
        serverRequestError={errorType}
        placeholder="Password"
        minLength={6}
        maxLength={40}
      />
      {errorType && typeof error === "object" && "errors" in error && (
        <p className={cl["error-text"]}>
          {"Email or password: " + error.errors["email or password"]}
        </p>
      )}
    </div>
  );
};

export default SingInPasswordInput;
