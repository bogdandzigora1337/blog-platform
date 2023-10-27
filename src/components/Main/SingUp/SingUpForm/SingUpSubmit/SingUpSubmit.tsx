import React from "react";
import { useFormContext } from "react-hook-form";

import cl from "./SingUpSubmit.module.scss";

type FormDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: string;
};

const SingUpSubmit: React.FC = () => {
  const { formState } = useFormContext<FormDataType>();
  const { isValid } = formState;
  return (
    <input
      type="submit"
      value={"Create"}
      className={cl["sing-up__create"]}
      disabled={!isValid}
    />
  );
};

export default SingUpSubmit;
