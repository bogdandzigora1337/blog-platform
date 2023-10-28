import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import cl from "../SingUpForm.module.scss";

import InputField from "../../../Form/InputField/InputField";
import { RegUserFormType } from "../../../../../types/types";

const SingUpConfirmPasswordInput: React.FC = () => {
  const { register, formState, control } = useFormContext<RegUserFormType>();
  const { errors } = formState;

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  return (
    <>
      <div className={cl["sing-up__item"]}>
        <InputField
          type="password"
          label="Repeat Password"
          name="confirmPassword"
          register={register}
          errors={errors}
          placeholder="Repeat Password"
          validate={(value: string) => {
            return value === password || "Passwords must match";
          }}
        />
      </div>
    </>
  );
};

export default SingUpConfirmPasswordInput;
