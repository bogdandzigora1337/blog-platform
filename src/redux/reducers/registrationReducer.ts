import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, CLEAR_REGISTER_USER_DATA } from '../types'
import { RegUserStateType } from '../../types/types'

const initialState: RegUserStateType['registrationReducer'] = {
  data: null,
  loader: false,
  error: null,
}

type userAction =
  | { type: typeof REGISTER_USER_REQUEST }
  | { type: typeof REGISTER_USER_SUCCESS; payload: object }
  | { type: typeof REGISTER_USER_FAILURE; payload: string }
  | { type: typeof CLEAR_REGISTER_USER_DATA; payload: string }

export const registrationReducer = (state = initialState, action: userAction) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loader: true,
        error: null,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      }

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loader: false,
      }

    case CLEAR_REGISTER_USER_DATA:
      return {
        ...state,
        data: null,
        error: null,
        loader: false,
      }

    default:
      return state
  }
}
