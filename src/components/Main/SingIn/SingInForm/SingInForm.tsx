import React from "react";

import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logToAcc } from "../../../../redux/actions/authActions";

import SingInEmailInput from "./SingInEmailInput/SingInEmailInput";
import SingInPasswordInput from "./SingInPasswordInput/SingInPasswordInput";
import SingInSubmit from "./SingInSubmit/SingInSubmit";

type FormDataType = {
  email: string;
  password: string;
};

type ErrorType = {
  logToAccountReducer: {
    error: string | { errors: { "email or password": string } };
  };
};

const SingInForm: React.FC = () => {
  const dispatch = useDispatch<any>();

  const error = useSelector(
    (state: ErrorType) => state.logToAccountReducer.error
  );

  const errorType =
    error && typeof error === "object" && error.errors["email or password"];

  const methods = useForm<FormDataType>({ mode: "onBlur" });

  const onSubmit = (data: FormDataType) => {
    dispatch(logToAcc(data.email, data.password));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SingInEmailInput error={error} errorType={errorType} />
        <SingInPasswordInput error={error} errorType={errorType} />
        <SingInSubmit />
      </form>
    </FormProvider>
  );
};

export default SingInForm;
