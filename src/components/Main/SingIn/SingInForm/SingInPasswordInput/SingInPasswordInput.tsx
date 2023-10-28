import React from "react";

import { useFormContext } from "react-hook-form";

import cl from "../SingInForm.module.scss";

import InputField from "../../../Form/InputField/InputField";

type FormDataType = {
  email: string;
  password: string;
};

interface ISingInEmailInputProps {
  errorType: string | false | null;
}

const SingInPasswordInput: React.FC<ISingInEmailInputProps> = ({
  errorType,
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
    </div>
  );
};

export default SingInPasswordInput;
