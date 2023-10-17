import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  CURRENT_ARTICLES_PAGE,
} from "../types";

interface ArticlesState {
  data: unknown[];
  loader: boolean;
  error: string | null;
  currentPage: number;
  percentLoader: number;
}

const initialState: ArticlesState = {
  data: [],
  loader: false,
  error: null,
  currentPage: 1,
  percentLoader: 0,
};

type ArticleAction =
  | { type: typeof FETCH_ARTICLES_REQUEST }
  | { type: typeof FETCH_ARTICLES_SUCCESS; payload: object }
  | { type: typeof FETCH_ARTICLES_FAILURE; payload: string }
  | { type: typeof CURRENT_ARTICLES_PAGE; payload: number };

export const articlesReducer = (
  state = initialState,
  action: ArticleAction
) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loader: true,
        percentLoader: 99.99,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
        percentLoader: 0,
      };

    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loader: false,
        percentLoader: 0,
      };

    case CURRENT_ARTICLES_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
