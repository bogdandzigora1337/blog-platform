import { Dispatch } from "redux";
import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  CURRENT_ARTICLES_PAGE,
} from "./types";

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
