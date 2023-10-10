import {
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_CREATE_FAIL,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
} from "./../Constant/noteConstant";
export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTE_LIST_REQUEST:
      return { Loader: true };
    case NOTE_LIST_SUCCESS:
      return { Loader: false, notes: action.payload };
    case NOTE_LIST_FAIL:
      return { Loader: false, error: action.payload };

    default:
      return state;
  }
};

export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_CREATE_REQUEST:
      return { Loader: true };
    case NOTE_CREATE_SUCCESS:
      return { Loader: false, success: true };
    case NOTE_CREATE_FAIL:
      return { Loader: false, error: action.payload };

    default:
      return state;
  }
};
export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_UPDATE_REQUEST:
      return { Loader: true };
    case NOTE_UPDATE_SUCCESS:
      return { Loader: false, success: true };
    case NOTE_UPDATE_FAIL:
      return { Loader: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_DELETE_REQUEST:
      return { Loader: true };
    case NOTE_DELETE_SUCCESS:
      return { Loader: false, success: true };
    case NOTE_DELETE_FAIL:
      return { Loader: false, error: action.payload, success: false };

    default:
      return state;
  }
};
