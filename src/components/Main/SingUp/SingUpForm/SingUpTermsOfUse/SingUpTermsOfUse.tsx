import React from "react";
import { useFormContext } from "react-hook-form";

import cl from "./SingUpTermsOfUse.module.scss";

import { RegUserFormType } from "../../../../../types/types";

const SingUpTermsOfUse: React.FC = () => {
  const { register } = useFormContext<RegUserFormType>();
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
