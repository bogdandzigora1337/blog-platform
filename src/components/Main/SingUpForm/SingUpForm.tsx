import React from "react";
import {
  useForm,
  useWatch,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  registrationUser,
  clearRegUserDataAction,
} from "../../../redux/actions";

import cl from "./SingUpForm.module.scss";

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

type RegUserData = {
  registrationReducer: {
    data: {
      user: {
        username: string;
        email: string;
        token: string;
      };
    };
  };
};

export const SingUpForm: React.FC = () => {
  const history = useHistory();
  let previousPath = history.location.pathname;
  history.listen((location, action) => {
    if (
      action === "PUSH" &&
      previousPath === "/sing-up" &&
      location.pathname !== "/sing-up"
    ) {
      dispatch(clearRegUserDataAction());
    }
    previousPath = location.pathname;
  });

  const dispatch = useDispatch<any>();
  const error = useSelector(
    (state: ErrorType) => state.registrationReducer.error
  );

  const regUserData = useSelector(
    (state: RegUserData) => state.registrationReducer.data
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<FormDataType>({ mode: "onBlur" });
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
    <div className={cl["sing-up"]}>
      <h1 className={cl["sing-up__title"]}>Create new account</h1>

      {regUserData ? (
        <p className={cl["sing-up__successful-registration"]}>
          Регистрация прошла успешно <span>✓</span>
        </p>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <UsernameInput error={error} />
              <EmailInput error={error} />
              <PasswordInput />
              <ConfirmPasswordInput />
              <TermsOfUse />
              <Submit />
            </form>
          </FormProvider>

          <p className={cl["sing-up__account-exists"]}>
            Already have an account?
            <Link to="/sing-in" className={cl["sing-up__account-exists__link"]}>
              Sign In.
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

type ErrorInputPropsType = {
  error: string | { errors: { username?: string; email?: string } } | null;
};

const UsernameInput: React.FC<ErrorInputPropsType> = ({ error }) => {
  const { register, formState } = useFormContext<FormDataType>();
  const { errors } = formState;

  const usernameError =
    error && typeof error === "object" && error.errors.username;

  return (
    <div className={cl["sing-up__item"]}>
      <p>Username</p>
      <input
        className={errors?.username || usernameError ? cl["input-error"] : ""}
        type="text"
        placeholder="Username"
        {...register("username", {
          required: "This field is required",
          maxLength: {
            value: 20,
            message: "Maximum 20 characters",
          },
          minLength: {
            value: 3,
            message: "Minimum 3 characters",
          },
        })}
      />
      {errors?.username ? (
        <p className={cl["error-text"]}>
          {errors?.username?.message || "Error"}
        </p>
      ) : (
        usernameError && (
          <p className={cl["error-text"]}>{error.errors.username}</p>
        )
      )}
    </div>
  );
};

const EmailInput: React.FC<ErrorInputPropsType> = ({ error }) => {
  const { register, formState } = useFormContext<FormDataType>();
  const { errors } = formState;

  const emailError = error && typeof error === "object" && error.errors.email;

  return (
    <div className={cl["sing-up__item"]}>
      <p>Email address</p>
      <input
        className={errors?.email || emailError ? cl["input-error"] : ""}
        type="email"
        placeholder="Email address"
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "The email address must contain the @ symbol",
          },
        })}
      />
      {errors?.email ? (
        <p className={cl["error-text"]}>{errors?.email?.message || "Error"}</p>
      ) : (
        emailError && <p className={cl["error-text"]}>{error.errors.email}</p>
      )}
    </div>
  );
};

const PasswordInput = () => {
  const { register, formState } = useFormContext<FormDataType>();
  const { errors } = formState;

  return (
    <div className={cl["sing-up__item"]}>
      <p>Password</p>
      <input
        className={errors?.password && cl["input-error"]}
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "This field is required",
          minLength: { value: 6, message: "Minimum 6 characters" },
          maxLength: { value: 40, message: "Maximum 40 characters" },
        })}
      />
      {errors?.password && (
        <p className={cl["error-text"]}>
          {errors?.password?.message || "Error"}
        </p>
      )}
    </div>
  );
};

const ConfirmPasswordInput = () => {
  const { register, formState, control } = useFormContext<FormDataType>();
  const { errors } = formState;

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  return (
    <div className={cl["sing-up__item"]}>
      <p>Repeat Password</p>
      <input
        className={errors?.confirmPassword && cl["input-error"]}
        type="password"
        placeholder="Repeat password"
        {...register("confirmPassword", {
          required: "This field is required",
          validate: (value) => {
            return value === password || "Passwords must match";
          },
        })}
      />
      {errors?.confirmPassword && (
        <p className={cl["error-text"]}>
          {errors?.confirmPassword.message || "Error"}
        </p>
      )}
    </div>
  );
};

const TermsOfUse = () => {
  const { register, formState } = useFormContext<FormDataType>();
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

const Submit = () => {
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
