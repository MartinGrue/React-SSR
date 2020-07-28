import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "../components/Routes";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { configureStore } from "../store/configure/configureStore";
import { usersInitialState } from "../store/reducers/usersReducer";

const store = configureStore(usersInitialState);
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
