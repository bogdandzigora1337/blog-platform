import React from "react";

import { useFormContext } from "react-hook-form";

import cl from "./SingInSubmit.module.scss";

type FormDataType = {
  email: string;
  password: string;
};

const SingInSubmit: React.FC = () => {
  const { formState } = useFormContext<FormDataType>();
  const { isValid } = formState;

  return (
    <input
      type="submit"
      value={"Login"}
      className={cl["sing-in__log"]}
      disabled={!isValid}
    />
  );
};

export default SingInSubmit;
