import { Dispatch } from "redux";
import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  CURRENT_ARTICLES_PAGE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  CLEAR_REGISTER_USER_DATA,
  LOGIN_TO_ACCOUNT_FAILURE,
  LOGIN_TO_ACCOUNT_REQUEST,
  LOGIN_TO_ACCOUNT_SUCCESS,
  LOGIN_OUT,
  CHANGE_USER_DATA_FAILURE,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CLEAR_CHANGE_USER_DATA_ERROR,
  CREATE_ARTICLES_FAILURE,
  CREATE_ARTICLES_REQUEST,
  CREATE_ARTICLES_SUCCESS,
} from "./types";

export const clearChangeUserDataErr = () => ({
  type: CLEAR_CHANGE_USER_DATA_ERROR,
});

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

type createArticleDataType = {
  token: string | null;
  data: {
    article: {
      title: string;
      description: string;
      body: string;
      tags: string[];
    };
  };
};

export const createArticleRequestAction = () => ({
  type: CREATE_ARTICLES_REQUEST,
});

export const createArticleSuccessAction = (data: unknown) => ({
  type: CREATE_ARTICLES_SUCCESS,
  payload: data,
});

export const createArticleFailureAction = (error: string | object) => ({
  type: CHANGE_USER_DATA_FAILURE,
  payload: error,
});

export const createArticle = (data: createArticleDataType) => {
  return (dispatch: Dispatch) => {
    dispatch(createArticleRequestAction());

    fetch("https://blog.kata.academy/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify(data.data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 422) {
            return response.json().then((errorData) => {
              dispatch(createArticleFailureAction(errorData));
            });
          }
          throw new Error("Network response was not ok");
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        dispatch(createArticleSuccessAction(responseData));
      })
      .catch((error) => {
        dispatch(createArticleFailureAction(error.message));
      });
  };
};
