import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import {
  registrationUser,
  clearRegUserDataAction,
} from "../../../../redux/actions";

import SingUpUsernameInput from "./SingUpUsernameInput/SingUpUsernameInput";
import SingUpEmailInput from "./SingUpEmailInput/SingUpEmailInput";
import SingUpPasswordInput from "./SingUpPasswordInput/SingUpPasswordInput";
import SingUpConfirmPasswordInput from "./SingUpConfirmPasswordInput/SingUpConfirmPasswordInput";
import SingUpTermsOfUse from "./SingUpTermsOfUse/SingUpTermsOfUse";
import SingUpSubmit from "./SingUpSubmit/SingUpSubmit";

type FormDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: string;
};

type ErrorType = {
  registrationReducer: {
    error: null | string | { errors: { username?: string; email?: string } };
  };
};

export const SingUpForm: React.FC = () => {
  const dispatch = useDispatch<any>();
  const error = useSelector(
    (state: ErrorType) => state.registrationReducer.error
  );

  const { reset } = useForm<FormDataType>({ mode: "onBlur" });
  const methods = useForm<FormDataType>({ mode: "onBlur" });

  const onSubmit = (data: FormDataType) => {
    const obj = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    dispatch(registrationUser(obj));
    dispatch(clearRegUserDataAction());
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SingUpUsernameInput error={error} />
        <SingUpEmailInput error={error} />
        <SingUpPasswordInput />
        <SingUpConfirmPasswordInput />
        <SingUpTermsOfUse />
        <SingUpSubmit />
      </form>
    </FormProvider>
  );
};
