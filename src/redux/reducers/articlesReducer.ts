import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  CURRENT_ARTICLES_PAGE,
  LIKE_ARTICLE_FAILURE,
  LIKE_ARTICLE_REQUEST,
  LIKE_ARTICLE_SUCCESS,
  UNLIKE_ARTICLE_FAILURE,
  UNLIKE_ARTICLE_REQUEST,
  UNLIKE_ARTICLE_SUCCESS,
} from '../types'
import { ArticleDataType } from '../../types/types'

export interface ArticlesState {
  data: { articles: ArticleDataType[] } | null
  loader: boolean
  error: string | null
  currentPage: number
  percentLoader: number
}

const initialState: ArticlesState = {
  data: null,
  loader: false,
  error: null,
  currentPage: 1,
  percentLoader: 0,
}

type ArticlesAction =
  | { type: typeof FETCH_ARTICLES_REQUEST }
  | { type: typeof FETCH_ARTICLES_SUCCESS; payload: object }
  | { type: typeof FETCH_ARTICLES_FAILURE; payload: string }
  | { type: typeof CURRENT_ARTICLES_PAGE; payload: number }
  | { type: typeof LIKE_ARTICLE_REQUEST }
  | { type: typeof LIKE_ARTICLE_SUCCESS; payload: any }
  | { type: typeof LIKE_ARTICLE_FAILURE; payload: string }
  | { type: typeof UNLIKE_ARTICLE_REQUEST }
  | { type: typeof UNLIKE_ARTICLE_SUCCESS; payload: any }
  | { type: typeof UNLIKE_ARTICLE_FAILURE; payload: string }

export const articlesReducer = (state = initialState, action: ArticlesAction) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loader: true,
        percentLoader: 99.6,
      }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
        percentLoader: 0,
      }

    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loader: false,
        percentLoader: 0,
      }

    case CURRENT_ARTICLES_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }

    case LIKE_ARTICLE_REQUEST:
    case UNLIKE_ARTICLE_REQUEST:
      return {
        ...state,
      }

    case LIKE_ARTICLE_SUCCESS:
    case UNLIKE_ARTICLE_SUCCESS: {
      const newArticles = [action.payload.article]

      const updateArticles = state.data?.articles.map((existsArticle) => {
        const matchingNewArticle = newArticles.find((newArticle: any) => newArticle.slug === existsArticle.slug)

        if (matchingNewArticle) {
          return matchingNewArticle
        }

        return existsArticle
      })

      return {
        ...state,
        data: { ...state.data, articles: updateArticles },
      }
    }

    case LIKE_ARTICLE_FAILURE:
    case UNLIKE_ARTICLE_FAILURE: {
      return {
        ...state,
      }
    }

    default:
      return state
  }
}
