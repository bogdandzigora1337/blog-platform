import React from "react";
import { useFormContext } from "react-hook-form";

import cl from "./SingUpTermsOfUse.module.scss";

type FormDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: string;
};

const SingUpTermsOfUse: React.FC = () => {
  const { register } = useFormContext<FormDataType>();
  return (
    <div className={cl["sing-up__agreement-pers"]}>
      <input
        type="checkbox"
        value="Yes"
        {...register("agreement", { required: true })}
      />
      <p>I agree to the processing of my personal information</p>
    </div>
  );
};

export default SingUpTermsOfUse;
