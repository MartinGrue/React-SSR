import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "../components/Routes";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { configureStore } from "../store/configure/configureStore";
import { usersState } from "../store/state/IState";
import axios from "axios";
import createCustomAxios from "../app/api/createCustomAxios";
declare global {
  interface Window {
    INITIAL_STATE: usersState;
  }
}
const axiosInstance = axios.create({ baseURL: "/api" });
const agent = createCustomAxios(axiosInstance);
const store = configureStore(window.INITIAL_STATE, agent);
console.log("store init state from server: ",window.INITIAL_STATE);
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
