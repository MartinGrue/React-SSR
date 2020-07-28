import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { renderRoutes } from "react-router-config";
import Routes from "../components/Routes";
import { Store, AnyAction } from "redux";
import { MyState } from "../client/reducers";
import { Provider } from "react-redux";
export default (req: Request, store: Store<MyState, AnyAction>) => {
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
              <script src="bundle.js"></script>
          </body>
      </html>
    `;
};
