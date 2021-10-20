import { combineReducers } from "redux";
import {
  bookCreateReducer,
  bookDeleteReducer,
  bookListReducer,
  bookUpdateReducer,
} from "./reducers/booksReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

export const rootReducer = combineReducers({
  bookList: bookListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  bookCreate: bookCreateReducer,
  bookDelete: bookDeleteReducer,
  bookUpdate: bookUpdateReducer,
  userUpdate: userUpdateReducer,
});

export default rootReducer;
