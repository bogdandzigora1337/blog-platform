import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  CURRENT_ARTICLES_PAGE,
  CREATE_ARTICLES_REQUEST,
  CREATE_ARTICLES_FAILURE,
  CREATE_ARTICLES_SUCCESS,
  ARTICLE_DELETE_SUCCESS,
} from "../types";
import { Dispatch } from "redux";
import { createArticleDataType } from "../../types/types";

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
