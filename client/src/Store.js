import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegsiterReducer,
  userUpdateReducer,
} from "./Reducers/userReducer";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./Reducers/noteReduces";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegsiterReducer,
  noteList: noteListReducer,
  notecreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  nodeDelete: noteDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoLocalStorage },
};
const middleware = [thunk];
const store = legacy_createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
