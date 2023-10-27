import { Dispatch } from "redux";

import {
  LOGIN_TO_ACCOUNT_REQUEST,
  LOGIN_TO_ACCOUNT_FAILURE,
  LOGIN_TO_ACCOUNT_SUCCESS,
  LOGIN_OUT,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_FAILURE,
  CHANGE_USER_DATA_SUCCESS,
  CLEAR_CHANGE_USER_DATA_ERROR,
  CLEAR_REGISTER_USER_DATA,
} from "../types";

type userDataType = {
  token?: string | null;
  user: {
    username?: string;
    email?: string;
    password?: string;
    image?: null | string;
    token?: string | null;
  };
};

export const logToAccRequest = () => ({
  type: LOGIN_TO_ACCOUNT_REQUEST,
});

export const logToAccSuccess = (data: unknown) => ({
  type: LOGIN_TO_ACCOUNT_SUCCESS,
  payload: data,
});

export const logToAccFailure = (error: string | object) => ({
  type: LOGIN_TO_ACCOUNT_FAILURE,
  payload: error,
});

export const logOutAction = () => ({
  type: LOGIN_OUT,
});

export const logToAcc = (email: string, password: string) => {
  const userReg: userDataType = {
    user: {
      email: email,
      password: password,
    },
  };

  return (dispatch: Dispatch) => {
    dispatch(logToAccRequest());

    fetch("https://blog.kata.academy/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userReg),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 422) {
            return response.json().then((errorData) => {
              dispatch(logToAccFailure(errorData));
            });
          }
          throw new Error("Network response was not ok");
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        dispatch(logToAccSuccess(responseData));
      })
      .catch((error) => {
        dispatch(logToAccFailure(error.message));
      });
  };
};

const registrationUserRequestAction = () => ({
  type: REGISTER_USER_REQUEST,
});

const registrationUserSuccessAction = (data: unknown) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data,
});

const registrationUserFailureAction = (error: string | object) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const registrationUser = (data: userDataType) => {
  return (dispatch: Dispatch) => {
    dispatch(registrationUserRequestAction());

    fetch("https://blog.kata.academy/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 422) {
            return response.json().then((errorData) => {
              dispatch(registrationUserFailureAction(errorData));
            });
          }
          throw new Error("Network response was not ok");
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        dispatch(registrationUserSuccessAction(responseData));
      })
      .catch((error) => {
        dispatch(registrationUserFailureAction(error.message));
      });
  };
};

export const changeUserDataRequestAction = () => ({
  type: CHANGE_USER_DATA_REQUEST,
});

export const changeUserDataSuccessAction = (data: unknown) => ({
  type: CHANGE_USER_DATA_SUCCESS,
  payload: data,
});

export const changeUserDataFailureAction = (error: string | object) => ({
  type: CHANGE_USER_DATA_FAILURE,
  payload: error,
});

export const changeUserData = (data: userDataType) => {
  return (dispatch: Dispatch) => {
    dispatch(changeUserDataRequestAction());

    fetch("https://blog.kata.academy/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (
            response.status === 401 ||
            response.status === 404 ||
            response.status === 422
          ) {
            return response.json().then((errorData) => {
              dispatch(changeUserDataFailureAction(errorData));
            });
          }
          throw new Error("Network response was not ok");
        } else {
          return response.json().then((responseData) => {
            dispatch(changeUserDataSuccessAction(responseData));
          });
        }
      })
      .catch((error) => {
        dispatch(changeUserDataFailureAction(error.message));
      });
  };
};

export const clearChangeUserDataErr = () => ({
  type: CLEAR_CHANGE_USER_DATA_ERROR,
});

export const clearRegUserDataAction = () => ({
  type: CLEAR_REGISTER_USER_DATA,
});
