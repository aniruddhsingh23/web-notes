import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
} from "./../Constant/userConstant.js";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
} from "../Constant/userConstant.js";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { Loader: true };
    case USER_LOGIN_SUCCESS:
      return { Loader: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { Loader: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegsiterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { Loader: true };
    case USER_REGISTER_SUCCESS:
      return { Loader: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { Loader: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { Loader: true };
    case USER_UPDATE_SUCCESS:
      return { Loader: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { Loader: false, error: action.payload, success: false };

    default:
      return state;
  }
};
