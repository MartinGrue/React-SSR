import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { renderRoutes } from "react-router-config";
import Routes from "../components/Routes";
export default () => {
  const content = renderToString(
    <StaticRouter context={{}}>
      <div>{renderRoutes(Routes)}</div>
    </StaticRouter>
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
