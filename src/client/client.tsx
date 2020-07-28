import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "../components/Routes";
import { renderRoutes } from "react-router-config";
import { createStore, applyMiddleware, Store, Action } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import {  MyState } from "./reducers/index";
import { initialState } from "./reducers/usersReducer";
import usersReducer from "./../client/reducers/usersReducer";
import { configureStore } from "./reducers/configureStore";


const store = configureStore(initialState);
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
