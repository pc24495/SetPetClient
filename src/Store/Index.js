import { createStore } from "redux";

const initialState = { loggedIn: false };

const reducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      loggedIn: true,
      username: action.username,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      loggedIn: false,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
