import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import cl from "./SingInForm.module.scss";

type FormData = {
  email: string;
  password: string;
  log: string;
};

export const SingInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className={cl["sing-in"]}>
      <h1 className={cl["sing-in__title"]}>Sing In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cl["sing-in__item"]}>
          <p>Email address</p>
          <input
            type="text"
            placeholder="Email address"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>

        <div className={cl["sing-in__item"]}>
          <p>Password</p>
          <input
            type="text"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>

        <input type="submit" value={"Login"} className={cl["sing-in__log"]} />
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
