/* eslint-disable-next-line */
import { Dispatch } from 'redux'

import {
  LIKE_ARTICLE_FAILURE,
  LIKE_ARTICLE_REQUEST,
  LIKE_ARTICLE_SUCCESS,
  UNLIKE_ARTICLE_FAILURE,
  UNLIKE_ARTICLE_REQUEST,
  UNLIKE_ARTICLE_SUCCESS,
} from '../types'

const likeArticleRequestAction = () => ({
  type: LIKE_ARTICLE_REQUEST,
})

const likeArticleSuccessAction = (data: unknown) => ({
  type: LIKE_ARTICLE_SUCCESS,
  payload: data,
})

const likeArticleFailureAction = (error: string | object) => ({
  type: LIKE_ARTICLE_FAILURE,
  payload: error,
})

const unlikeArticleRequestAction = () => ({
  type: UNLIKE_ARTICLE_REQUEST,
})

const unlikeArticleSuccessAction = (data: unknown) => ({
  type: UNLIKE_ARTICLE_SUCCESS,
  payload: data,
})

const unlikeArticleFailureAction = (error: string | object) => ({
  type: UNLIKE_ARTICLE_FAILURE,
  payload: error,
})

export const toggleArticleLikeAPI = (slug: string, token: string, like: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch(like ? likeArticleRequestAction() : unlikeArticleRequestAction())

    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: like ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json()
          dispatch(like ? likeArticleFailureAction(errorData) : unlikeArticleFailureAction(errorData))
          throw errorData
        }
        throw new Error('Network response was not ok')
      } else {
        const responseData = await response.json()
        dispatch(like ? likeArticleSuccessAction(responseData) : unlikeArticleSuccessAction(responseData))
        return { status: 'success', data: responseData }
      }
    } catch (error: any) {
      dispatch(like ? likeArticleFailureAction(error.message) : unlikeArticleFailureAction(error.message))
    }
  }
}
