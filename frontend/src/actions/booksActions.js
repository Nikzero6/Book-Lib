import {
  BOOKS_CREATE_FAIL,
  BOOKS_CREATE_REQUEST,
  BOOKS_CREATE_SUCCESS,
  BOOKS_DELETE_FAIL,
  BOOKS_DELETE_REQUEST,
  BOOKS_DELETE_SUCCESS,
  BOOKS_LIST_FAIL,
  BOOKS_LIST_REQUEST,
  BOOKS_LIST_SUCCESS,
  BOOKS_UPDATE_FAIL,
  BOOKS_UPDATE_REQUEST,
  BOOKS_UPDATE_SUCCESS,
} from "../constants/booksConstants";
import axios from "axios";

export const listBooks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/books`, config);

    dispatch({
      type: BOOKS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKS_LIST_FAIL,
      payload: message,
    });
  }
};

export const rentBookslist = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/books/rent/${id}`, config);

    dispatch({
      type: BOOKS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createBookAction =
  (title, short_desc, category, count) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOKS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/books/create`,
        { title, short_desc, category, count },
        config
      );

      dispatch({
        type: BOOKS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BOOKS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteBookAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/books/${id}`, config);

    dispatch({
      type: BOOKS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateBookAction =
  (id, title, short_desc, category, count) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOKS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/books/${id}`,
        { title, short_desc, category, count },
        config
      );

      dispatch({
        type: BOOKS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BOOKS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
