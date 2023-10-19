import { combineReducers } from "redux";

import { articlesReducer } from "./articlesReducer";
import { registrationReducer } from "./registrationReducer";
import { logToAccountReducer } from "./logToAccountReducer";

export const rootReducer = combineReducers({
  articlesReducer: articlesReducer,
  registrationReducer: registrationReducer,
  logToAccountReducer: logToAccountReducer,
});
