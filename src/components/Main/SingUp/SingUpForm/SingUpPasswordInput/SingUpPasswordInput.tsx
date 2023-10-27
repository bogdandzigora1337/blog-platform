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

const SingUpPasswordInput: React.FC = () => {
  const { register, formState } = useFormContext<FormDataType>();
  const { errors } = formState;

  return (
    <>
      <div className={cl["sing-up__item"]}>
        <InputField
          label="Password"
          type="password"
          name="password"
          register={register}
          minLength={6}
          maxLength={40}
          placeholder="Password"
          errors={errors}
        />
      </div>
    </>
  );
};

export default SingUpPasswordInput;
