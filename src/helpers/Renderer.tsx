import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { renderRoutes } from "react-router-config";
import Routes from "../components/Routes";
import { Provider } from "react-redux";
import { appStore } from "../store/configure/configureStore";
import serialize from "serialize-javascript";
export const rendererComponent = () => {};
export default (req: Request, store: appStore) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  return `
      <html>
          <head></head>
          <body>
              <div id="root">${content}</div>
              <script>window.INITIAL_STATE = ${serialize(
                store.getState()
              )}</script>
              <script src="clientBundle.js"></script>
          </body>
      </html>
    `;
};
