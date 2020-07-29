import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { renderRoutes } from "react-router-config";
import Routes from "../components/Routes";
import { Store } from "redux";
import { Provider } from "react-redux";
import { usersState } from "../store/state/IState";
import { usersActions } from "../store/actions/IActions";

export const rendererComponent = () => {
  
}
export default (req: Request, store: Store<usersState, usersActions>) => {
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
              <script src="clientBundle.js"></script>
          </body>
      </html>
    `;
};
