import {
  BOOKS_UPDATE_REQUEST,
  BOOKS_UPDATE_SUCCESS,
  BOOKS_UPDATE_FAIL,
  BOOKS_CREATE_FAIL,
  BOOKS_CREATE_REQUEST,
  BOOKS_CREATE_SUCCESS,
  BOOKS_DELETE_FAIL,
  BOOKS_DELETE_REQUEST,
  BOOKS_DELETE_SUCCESS,
  BOOKS_LIST_FAIL,
  BOOKS_LIST_REQUEST,
  BOOKS_LIST_SUCCESS,
} from "../constants/booksConstants";

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOKS_LIST_REQUEST:
      return { loading: true };
    case BOOKS_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOKS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKS_CREATE_REQUEST:
      return { loading: true };
    case BOOKS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BOOKS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKS_DELETE_REQUEST:
      return { loading: true };
    case BOOKS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOKS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const bookUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKS_UPDATE_REQUEST:
      return { loading: true };
    case BOOKS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BOOKS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
