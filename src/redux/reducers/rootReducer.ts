import { combineReducers } from 'redux'

import { articlesReducer } from './articlesReducer'
import { registrationReducer } from './registrationReducer'
import { logToAccountReducer } from './logToAccountReducer'
import { createArticleReducer } from './createArticleReducer'

export const rootReducer = combineReducers({
  articlesReducer: articlesReducer,
  registrationReducer: registrationReducer,
  logToAccountReducer: logToAccountReducer,
  createArticleReducer: createArticleReducer,
})
