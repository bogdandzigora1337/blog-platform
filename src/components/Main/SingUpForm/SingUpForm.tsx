import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

import cl from "./SingUpForm.module.scss";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: string;
};

export const SingUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [PasswordLengthValid, setPasswordLengthValid] = useState(true);

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const passwordRepeat = useWatch({
    control,
    name: "confirmPassword",
    defaultValue: "",
  });

  return (
    <div className={cl["sing-up"]}>
      <h1 className={cl["sing-up__title"]}>Create new account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cl["sing-up__item"]}>
          <p>Username</p>
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
              maxLength: 20,
              minLength: 3,
            })}
          />
        </div>

        <div className={cl["sing-up__item"]}>
          <p>Email address</p>
          <input
            type="text"
            placeholder="Email address"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>

        <div className={cl["sing-up__item"]}>
          <p>Password</p>
          <input
            className={
              PasswordLengthValid ? "" : cl["password-inappropriate--length"]
            }
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
          />
          {PasswordLengthValid ? null : (
            <p className={cl["password-inappropriate--length__text"]}>
              Your password needs to be at least 6 characters.
            </p>
          )}
        </div>

        <div className={cl["sing-up__item"]}>
          <p>Repeat Password</p>
          <input
            className={passwordsMatch ? "" : cl["password-mismatch"]}
            type="password"
            placeholder="Repeat password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password,
            })}
          />
          {passwordsMatch ? null : (
            <p className={cl["password-mismatch__text"]}>
              Passwords must match
            </p>
          )}
        </div>

        <div className={cl["sing-up__agreement-pers"]}>
          <input
            type="checkbox"
            value="Yes"
            {...register("agreement", { required: true })}
          />
          <p>I agree to the processing of my personal information</p>
        </div>

        <input
          type="submit"
          value={"Create"}
          className={cl["sing-up__create"]}
          onClick={() => {
            console.log(passwordsMatch);
            setPasswordsMatch(password === passwordRepeat);
            setPasswordLengthValid(password.length > 6);
          }}
        />
      </form>

      <p className={cl["sing-up__account-exists"]}>
        Already have an account?
        <Link to="/sing-in" className={cl["sing-up__account-exists__link"]}>
          Sign In.
        </Link>
      </p>
    </div>
  );
};
