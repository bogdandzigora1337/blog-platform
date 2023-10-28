import {
  LOGIN_TO_ACCOUNT_FAILURE,
  LOGIN_TO_ACCOUNT_REQUEST,
  LOGIN_TO_ACCOUNT_SUCCESS,
  LOGIN_OUT,
  CHANGE_USER_DATA_FAILURE,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CLEAR_CHANGE_USER_DATA_ERROR,
  CLEAR_USER_LOGIN_ERROR,
} from "../types";

import { UserStateType } from "../../types/types";

const initialState: UserStateType["logToAccountReducer"] = {
  data: null,
  loader: false,
  error: null,
  editingError: null,
};

type userAction =
  | { type: typeof LOGIN_TO_ACCOUNT_REQUEST }
  | { type: typeof LOGIN_TO_ACCOUNT_SUCCESS; payload: object }
  | { type: typeof LOGIN_TO_ACCOUNT_FAILURE; payload: string | object }
  | { type: typeof LOGIN_OUT }
  | { type: typeof CHANGE_USER_DATA_REQUEST }
  | { type: typeof CHANGE_USER_DATA_SUCCESS; payload: object }
  | { type: typeof CHANGE_USER_DATA_FAILURE; payload: string | object }
  | { type: typeof CLEAR_CHANGE_USER_DATA_ERROR }
  | { type: typeof CLEAR_USER_LOGIN_ERROR };

export const logToAccountReducer = (
  state = initialState,
  action: userAction
) => {
  switch (action.type) {
    case LOGIN_TO_ACCOUNT_REQUEST:
      return {
        ...state,
        loader: true,
        error: null,
      };
    case LOGIN_TO_ACCOUNT_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };

    case LOGIN_TO_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loader: false,
      };

    case CHANGE_USER_DATA_REQUEST:
      return {
        ...state,
        loader: true,
        editingError: null,
      };

    case CHANGE_USER_DATA_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
        editingError: false,
      };

    case CHANGE_USER_DATA_FAILURE:
      return {
        ...state,
        editingError: action.payload,
        loader: false,
      };

    case CLEAR_CHANGE_USER_DATA_ERROR:
      return {
        ...state,
        editingError: null,
      };

    case LOGIN_OUT:
      return {
        ...state,
        error: null,
        loader: false,
        data: null,
      };

    case CLEAR_USER_LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
