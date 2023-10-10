import axios from "axios";
import {
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_FAIL,
  NOTE_CREATE_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_REQUEST,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
} from "./../Constant/noteConstant";

export const ListNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/notes", config);

    dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const CreateNotes =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/notes/create",
        { title, content, category },
        config
      );

      dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const UpdateNotes =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/notes/${id}`,
        { title, content, category },
        config
      );

      dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const DeteleNotes = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/notes/${id}`, config);

    dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
