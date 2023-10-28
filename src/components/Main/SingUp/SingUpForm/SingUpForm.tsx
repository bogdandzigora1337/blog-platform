import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { clearRegUserDataAction } from "../../../../redux/actions/authActions";

import { registrationUser } from "../../../../redux/actions/authActions";

import SingUpUsernameInput from "./SingUpUsernameInput/SingUpUsernameInput";
import SingUpEmailInput from "./SingUpEmailInput/SingUpEmailInput";
import SingUpPasswordInput from "./SingUpPasswordInput/SingUpPasswordInput";
import SingUpConfirmPasswordInput from "./SingUpConfirmPasswordInput/SingUpConfirmPasswordInput";
import SingUpTermsOfUse from "./SingUpTermsOfUse/SingUpTermsOfUse";
import SingUpSubmit from "./SingUpSubmit/SingUpSubmit";

import { RegUserStateType, RegUserFormType } from "../../../../types/types";

export const SingUpForm: React.FC = () => {
  const dispatch = useDispatch<any>();
  const error = useSelector(
    (state: RegUserStateType) => state.registrationReducer.error
  );

  const { reset } = useForm<RegUserFormType>({ mode: "onBlur" });
  const methods = useForm<RegUserFormType>({ mode: "onBlur" });

  const onSubmit = (data: RegUserFormType) => {
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
