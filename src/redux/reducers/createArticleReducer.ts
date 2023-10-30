import {
  CREATE_ARTICLES_FAILURE,
  CREATE_ARTICLES_REQUEST,
  CREATE_ARTICLES_SUCCESS,
  ARTICLE_DELETE_SUCCESS,
} from '../types'
import { ArticleDataType } from '../../types/types'

interface IArticleState {
  data: ArticleDataType | null
  loader: boolean
  error: null | string
}

const initialState: IArticleState = {
  data: null,
  loader: false,
  error: null,
}

type ArticleAction =
  | { type: typeof CREATE_ARTICLES_REQUEST }
  | { type: typeof CREATE_ARTICLES_SUCCESS; payload: object }
  | { type: typeof CREATE_ARTICLES_FAILURE; payload: string }
  | { type: typeof ARTICLE_DELETE_SUCCESS }

export const createArticleReducer = (state = initialState, action: ArticleAction) => {
  switch (action.type) {
    case CREATE_ARTICLES_REQUEST:
      return {
        ...state,
        loader: true,
      }
    case CREATE_ARTICLES_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
        error: null,
      }

    case CREATE_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loader: false,
      }

    case ARTICLE_DELETE_SUCCESS:
      return {
        ...state,
        data: null,
        loader: false,
        error: null,
      }

    default:
      return state
  }
}
