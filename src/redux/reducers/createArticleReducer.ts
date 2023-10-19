import {
  CREATE_ARTICLES_FAILURE,
  CREATE_ARTICLES_REQUEST,
  CREATE_ARTICLES_SUCCESS,
} from "../types";

interface IuserState {
  data: object | null;
  loader: boolean;
  error: string | null | object;
}

const initialState: IuserState = {
  data: null,
  loader: false,
  error: null,
};

type ArticleAction =
  | { type: typeof CREATE_ARTICLES_REQUEST }
  | { type: typeof CREATE_ARTICLES_SUCCESS; payload: object }
  | { type: typeof CREATE_ARTICLES_FAILURE; payload: string };

export const createArticleReducer = (
  state = initialState,
  action: ArticleAction
) => {
  switch (action.type) {
    case CREATE_ARTICLES_REQUEST:
      return {
        ...state,
        loader: true,
        error: null,
      };
    case CREATE_ARTICLES_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };

    case CREATE_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loader: false,
      };

    default:
      return state;
  }
};
