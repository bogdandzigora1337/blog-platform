import { act } from "react-dom/test-utils";
import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
} from "../types";

interface ArticlesState {
  data: unknown[];
  loader: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  data: [],
  loader: false,
  error: null,
};

type ArticleAction =
  | { type: typeof FETCH_ARTICLES_REQUEST }
  | { type: typeof FETCH_ARTICLES_SUCCESS; payload: object }
  | { type: typeof FETCH_ARTICLES_FAILURE; payload: string };

export const articlesReducer = (
  state = initialState,
  action: ArticleAction
) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };

    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
