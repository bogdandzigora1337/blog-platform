import { Dispatch } from "redux";
import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  CURRENT_ARTICLES_PAGE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  LOGIN_TO_ACCOUNT_FAILURE,
  LOGIN_TO_ACCOUNT_REQUEST,
  LOGIN_TO_ACCOUNT_SUCCESS,
  CLEAR_REGISTER_USER_DATA,
  LOGIN_OUT,
} from "./types";

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

type LogUserType = {
  user: {
    email: string;
    password: string;
  };
};

export const logToAcc = (email: string, password: string) => {
  const userReg: LogUserType = {
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

export const getArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});

export const getArticlesSuccess = (data: unknown) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: data,
});

export const getArticlesFailure = (error: string) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});

export const currentArticlesPage = (page: number) => ({
  type: CURRENT_ARTICLES_PAGE,
  payload: page,
});

export const getArticles = (numArticles: number = 5, offset: number = 0) => {
  return (dispatch: Dispatch) => {
    dispatch(getArticlesRequest());

    fetch(
      `https://blog.kata.academy/api/articles?limit=${numArticles}&offset=${offset}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          dispatch(getArticlesSuccess(data));
        } else {
          throw new Error("Invalid data received from the server");
        }
      })
      .catch((error) => dispatch(getArticlesFailure(error.message)));
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

export const clearRegUserDataAction = () => ({
  type: CLEAR_REGISTER_USER_DATA,
});

type RegUserType = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export const registrationUser = (data: RegUserType) => {
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
