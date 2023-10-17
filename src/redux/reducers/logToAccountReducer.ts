import {
  LOGIN_TO_ACCOUNT_FAILURE,
  LOGIN_TO_ACCOUNT_REQUEST,
  LOGIN_TO_ACCOUNT_SUCCESS,
  LOGIN_OUT,
} from "../types";

interface IuserState {
  data: unknown[] | null;
  loader: boolean;
  error: string | null;
}

const initialState: IuserState = {
  data: null,
  loader: false,
  error: null,
};

type userAction =
  | { type: typeof LOGIN_TO_ACCOUNT_REQUEST }
  | { type: typeof LOGIN_TO_ACCOUNT_SUCCESS; payload: object }
  | { type: typeof LOGIN_TO_ACCOUNT_FAILURE; payload: string }
  | { type: typeof LOGIN_OUT };

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

    case LOGIN_OUT:
      return {
        ...state,
        error: null,
        loading: false,
        data: null,
      };

    default:
      return state;
  }
};
