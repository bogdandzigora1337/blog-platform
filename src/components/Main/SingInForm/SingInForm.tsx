import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logToAcc } from "../../../redux/actions";

import cl from "./SingInForm.module.scss";

type FormData = {
  email: string;
  password: string;
};

type ErrorType = {
  logToAccountReducer: {
    error: null | string | { errors: { "email or password": string } };
  };
};

type LogInUserDetailsType = {
  logToAccountReducer: {
    data: null | { user: { username: string; email: string; token: string } };
  };
};

export const SingInForm: React.FC = () => {
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const error = useSelector(
    (state: ErrorType) => state.logToAccountReducer.error
  );

  const errorType =
    error && typeof error === "object" && error.errors["email or password"];

  const logInUserDetails = useSelector(
    (state: LogInUserDetailsType) => state.logToAccountReducer.data
  );
  useEffect(() => {
    if (logInUserDetails) {
      history.push("/articles");
    }
  }, [logInUserDetails]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ mode: "onBlur" });
  const onSubmit = (data: FormData) => {
    dispatch(logToAcc(data.email, data.password));
  };

  return (
    <div className={cl["sing-in"]}>
      <h1 className={cl["sing-in__title"]}>Sing In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cl["sing-in__item"]}>
          <p>Email address</p>
          <input
            className={errors?.email || errorType ? cl["input-error"] : ""}
            type="text"
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
            <p className={cl["error-text"]}>
              {errors?.email?.message || "Error"}
            </p>
          ) : (
            errorType && (
              <p className={cl["error-text"]}>
                {"Email or password: " + error.errors["email or password"]}
              </p>
            )
          )}
        </div>

        <div className={cl["sing-in__item"]}>
          <p>Password</p>
          <input
            className={errors?.email || errorType ? cl["input-error"] : ""}
            type="text"
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

        <input
          type="submit"
          value={"Login"}
          className={cl["sing-in__log"]}
          disabled={!isValid}
        />
      </form>

      <p className={cl["sing-in__account-log"]}>
        Don’t have an account?
        <Link to="/sing-up" className={cl["sing-in__account-log__link"]}>
          Sign Up.
        </Link>
      </p>
    </div>
  );
};
