import React from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

import cl from "./ProfileEditingForm.module.scss";

import { changeUserData } from "../../../redux/actions";
import { clearChangeUserDataErr } from "../../../redux/actions";

const svg = (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="check-circle"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
  </svg>
);

type FormData = {
  [key: string]: string;
};

type UserTokenType = {
  logToAccountReducer: {
    data: {
      user: {
        token?: string;
        image?: string;
        email?: string;
        username?: string;
      } | null;
    } | null;
  };
};

type EditingErrorType = {
  logToAccountReducer: {
    editingError:
      | {
          errors?: {
            username?: string;
            email?: string;
          };
        }
      | null
      | boolean;
  };
};

export const ProfileEditingForm: React.FC = () => {
  const history = useHistory();
  let previousPath = history.location.pathname;
  history.listen((location, action) => {
    if (
      action === "PUSH" &&
      previousPath === "/profile" &&
      location.pathname !== "/profile"
    ) {
      dispatch(clearChangeUserDataErr());
    }
    previousPath = location.pathname;
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const dispatch = useDispatch<any>();
  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer?.data?.user?.token
  );
  const editingError = useSelector(
    (state: EditingErrorType) => state.logToAccountReducer.editingError
  );

  const userData = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data?.user
  );

  const removeEmptyValues = (obj: FormData) => {
    for (const key in obj) {
      if (obj[key] === "") {
        delete obj[key];
      }
    }
    return obj;
  };

  const onSubmit = (data: FormData) => {
    const wrapperData = {
      token: userToken,
      user: { ...removeEmptyValues(data) },
    };
    dispatch(changeUserData(wrapperData));
  };

  const isAnyFieldFilled = Object.values(watch()).some((elem) => elem);

  return (
    <div className={cl["edit-profile"]}>
      <h1 className={cl["edit-profile__title"]}>Edit Profile</h1>
      {userToken ? (
        editingError === false ? (
          <div className={cl["success-notification"]}>
            <p>
              <span>{svg}</span> Data has been successfully updated.
            </p>
            <Button
              onClick={() => dispatch(clearChangeUserDataErr())}
              style={{
                backgroundColor: "#b7eb8f",
              }}
            >
              Close notification
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cl["edit-profile__item"]}>
              <p>Username</p>
              <input
                className={errors?.username && cl["input-error"]}
                type="text"
                placeholder={`${userData?.username}`}
                {...register("username", {
                  pattern: {
                    value: /^[a-z0-9]+$/,
                    message:
                      "login can only consist of small letters and numbers",
                  },
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
                typeof editingError === "object" &&
                editingError?.errors && (
                  <p className={cl["error-text"]}>
                    {editingError.errors.username}
                  </p>
                )
              )}
            </div>

            <div className={cl["edit-profile__item"]}>
              <p>Email address</p>
              <input
                className={errors?.email && cl["input-error"]}
                type="email"
                placeholder={`${userData?.email}`}
                {...register("email", {
                  validate: (value) => {
                    if (value) {
                      if (!/^\S+@\S+$/i.test(value)) {
                        return "The email address must contain the @ symbol";
                      }
                      if (!/^[a-z0-9.@]+$/.test(value)) {
                        return "Email should be in lowercase";
                      }
                    }
                    return true;
                  },
                })}
              />
              {errors?.email ? (
                <p className={cl["error-text"]}>
                  {errors?.email?.message || "Error"}
                </p>
              ) : (
                typeof editingError === "object" &&
                editingError?.errors && (
                  <p className={cl["error-text"]}>
                    {editingError.errors.email}
                  </p>
                )
              )}
            </div>

            <div className={cl["edit-profile__item"]}>
              <p>New password</p>
              <input
                className={errors?.password && cl["input-error"]}
                type="password"
                placeholder="Password"
                {...register("password", {
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
              onClick={() => dispatch(clearChangeUserDataErr())}
            />
          </form>
        )
      ) : (
        <p className={cl["edit-profile__login-notification"]}>
          Log in to your account to edit your profile
          <Link
            to="/sing-in"
            className={cl["edit-profile__account-exists__link"]}
          >
            Sign In.
          </Link>
        </p>
      )}
    </div>
  );
};
