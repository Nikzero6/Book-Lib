import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  bookCreateReducer,
  bookDeleteReducer,
  bookListReducer,
  bookUpdateReducer,
} from "./reducers/booksReducers";
import {
  booksRentReducer,
  booksReturnReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  bookList: bookListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  bookCreate: bookCreateReducer,
  bookDelete: bookDeleteReducer,
  bookUpdate: bookUpdateReducer,
  userUpdate: userUpdateReducer,
  bookRent: booksRentReducer,
  bookReturn: booksReturnReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
