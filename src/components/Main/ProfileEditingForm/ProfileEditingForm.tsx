import React from "react";

import { useForm } from "react-hook-form";

import cl from "./ProfileEditingForm.module.scss";

type FormData = {
  username: string;
  email: string;
  newPassword: string;
  image: string;
};

export const ProfileEditingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = (data: FormData) => console.log(data);

  const isAnyFieldFilled = Object.values(watch()).some((elem) => elem);

  return (
    <div className={cl["edit-profile"]}>
      <h1 className={cl["edit-profile__title"]}>Edit Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cl["edit-profile__item"]}>
          <p>Username</p>
          <input
            className={errors?.username && cl["input-error"]}
            type="text"
            placeholder="Username"
            {...register("username", {
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
          {errors?.username && (
            <p className={cl["error-text"]}>
              {errors?.username?.message || "Error"}
            </p>
          )}
        </div>

        <div className={cl["edit-profile__item"]}>
          <p>Email address</p>
          <input
            className={errors?.email && cl["input-error"]}
            type="email"
            placeholder="New email address"
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "The email address must contain the @ symbol",
              },
            })}
          />
          {errors?.email && (
            <p className={cl["error-text"]}>
              {errors?.email?.message || "Error"}
            </p>
          )}
        </div>

        <div className={cl["edit-profile__item"]}>
          <p>New password</p>
          <input
            className={errors?.newPassword && cl["input-error"]}
            type="password"
            placeholder="Password"
            {...register("newPassword", {
              minLength: { value: 6, message: "Minimum 6 characters" },
              maxLength: { value: 40, message: "Maximum 40 characters" },
            })}
          />
          {errors?.newPassword && (
            <p className={cl["error-text"]}>
              {errors?.newPassword?.message || "Error"}
            </p>
          )}
        </div>

        <div className={cl["edit-profile__item"]}>
          <p>Avatar image (url)</p>
          <input
            className={errors?.image && cl["input-error"]}
            type="url"
            placeholder="Avatar image"
            {...register("image")}
          />
        </div>

        <input
          type="submit"
          value={"Save"}
          className={cl["edit-profile__save"]}
          disabled={!isValid || !isAnyFieldFilled}
        />
      </form>
    </div>
  );
};
