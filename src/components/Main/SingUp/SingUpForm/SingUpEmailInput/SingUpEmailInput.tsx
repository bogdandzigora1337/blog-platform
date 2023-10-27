import React from "react";
import { useFormContext } from "react-hook-form";

import cl from "../SingUpForm.module.scss";
import InputField from "../../../Form/InputField/InputField";

type FormDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: string;
};

type ErrorInputPropsType = {
  error: string | { errors: { username?: string; email?: string } } | null;
};

const SingUpEmailInput: React.FC<ErrorInputPropsType> = ({ error }) => {
  const { register, formState } = useFormContext<FormDataType>();
  const { errors } = formState;

  const emailError = error && typeof error === "object" && error.errors.email;

  return (
    <>
      <div className={cl["sing-up__item"]}>
        <InputField
          label="Email address"
          type="email"
          name="email"
          register={register}
          errors={errors}
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
          serverRequestError={emailError}
        />
        {emailError && <p className={cl["error-text"]}>{error.errors.email}</p>}
      </div>
    </>
  );
};

export default SingUpEmailInput;
