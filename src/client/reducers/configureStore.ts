import { MyState } from ".";
import { Store, createStore, applyMiddleware } from "redux";
import usersReducer from "./usersReducer"
import thunk from "redux-thunk";

export const configureStore = (initialState: MyState): Store<MyState> => {
    // create the composing function for our middlewares
  
    // We'll create our store with the combined reducers and the initial Redux state that
    // we'll be passing from our entry point.
    return createStore(
      usersReducer,
      initialState,
      applyMiddleware(thunk)
    );
  };