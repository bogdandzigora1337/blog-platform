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
  ARTICLE_DELETE_SUCCESS,
  LIKE_ARTICLE_FAILURE,
  LIKE_ARTICLE_REQUEST,
  LIKE_ARTICLE_SUCCESS,
  UNLIKE_ARTICLE_FAILURE,
  UNLIKE_ARTICLE_REQUEST,
  UNLIKE_ARTICLE_SUCCESS,
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

export const getArticles = (
  numArticles: number = 5,
  offset: number = 1,
  userToken?: string | null
) => {
  return (dispatch: Dispatch) => {
    dispatch(getArticlesRequest());

    const url = `https://blog.kata.academy/api/articles?limit=${numArticles}&offset=${offset}`;
    const options: RequestInit | undefined = userToken
      ? {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      : undefined;

    fetch(url, options)
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
  token: string | null | undefined;
  slug?: string;
  data: {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[] | [];
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
  type: CREATE_ARTICLES_FAILURE,
  payload: error,
});

// export const createArticle = (
//   data: createArticleDataType,
//   method: string
// ): any => {
//   return (dispatch: Dispatch) => {
//     dispatch(createArticleRequestAction());

//     fetch(
//       `https://blog.kata.academy/api/article/${data.slug ? data.slug : ""}`,
//       {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${data.token}`,
//         },
//         body: JSON.stringify(data.data),
//       }
//     )
//       .then((response) => {
//         if (!response.ok) {
//           if (response.status === 422) {
//             return response.json().then((errorData) => {
//               dispatch(createArticleFailureAction(errorData));
//               throw errorData;
//             });
//           }
//           throw new Error("Network response was not ok");
//         } else {
//           return response.json();
//         }
//       })
//       .then((responseData) => {
//         dispatch(createArticleSuccessAction(responseData));
//         return { status: "success", data: responseData };
//       })
//       .catch((error) => {
//         dispatch(createArticleFailureAction(error.message));
//         return { status: "error", error: error };
//       });
//   };
// };

export const createArticle = (data: createArticleDataType, method: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createArticleRequestAction());

    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${data.slug ? data.slug : ""}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${data.token}`,
          },
          body: JSON.stringify(data.data),
        }
      );

      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json();
          dispatch(createArticleFailureAction(errorData));
          throw errorData;
        }
        throw new Error("Network response was not ok");
      } else {
        const responseData = await response.json();
        dispatch(createArticleSuccessAction(responseData));
        return { status: "success", data: responseData };
      }
    } catch (error: any) {
      dispatch(createArticleFailureAction(error.message));
    }
  };
};

export const articleDeleteAction = () => ({
  type: ARTICLE_DELETE_SUCCESS,
});

export const articleDelete = (token: string, slug: string) => {
  return (dispatch: Dispatch) => {
    dispatch(createArticleRequestAction());

    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        dispatch(articleDeleteAction());
      })
      .catch((error) => {
        return error;
      });
  };
};

const likeArticleRequestAction = () => ({
  type: LIKE_ARTICLE_REQUEST,
});

const likeArticleSuccessAction = (data: unknown) => ({
  type: LIKE_ARTICLE_SUCCESS,
  payload: data,
});

const likeArticleFailureAction = (error: string | object) => ({
  type: LIKE_ARTICLE_FAILURE,
  payload: error,
});

const unlikeArticleRequestAction = () => ({
  type: UNLIKE_ARTICLE_REQUEST,
});

const unlikeArticleSuccessAction = (data: unknown) => ({
  type: UNLIKE_ARTICLE_SUCCESS,
  payload: data,
});

const unlikeArticleFailureAction = (error: string | object) => ({
  type: UNLIKE_ARTICLE_FAILURE,
  payload: error,
});

export const toggleArticleLikeAPI = (
  slug: string,
  token: string,
  like: boolean
) => {
  return async (dispatch: Dispatch) => {
    dispatch(like ? likeArticleRequestAction() : unlikeArticleRequestAction());

    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {
          method: like ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json();
          dispatch(
            like
              ? likeArticleFailureAction(errorData)
              : unlikeArticleFailureAction(errorData)
          );
          throw errorData;
        }
        throw new Error("Network response was not ok");
      } else {
        const responseData = await response.json();
        dispatch(
          like
            ? likeArticleSuccessAction(responseData)
            : unlikeArticleSuccessAction(responseData)
        );
        return { status: "success", data: responseData };
      }
    } catch (error: any) {
      dispatch(
        like
          ? likeArticleFailureAction(error.message)
          : unlikeArticleFailureAction(error.message)
      );
    }
  };
};
