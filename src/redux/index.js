import { combineReducers } from "redux";
import user from "./user";

const rootReducer = combineReducers({
  user,
});

// reducer는 export default 해야된다는데 why??
// default 가 아니라 const 로 해도 작동하는듯 한데.

export default rootReducer;
