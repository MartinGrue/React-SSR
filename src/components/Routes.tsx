import Home from "./Home";
import { RouteConfig } from "react-router-config";
import React from "react";
const Routes: RouteConfig[] = [
  {
    component: Home,
    routes: [
      {
        component: Home,
        path: "/",
        exact: true,
      },
      {
        path: "/hi",
        component: () => {
          return (
            <div>
              <p>Hi</p>
            </div>
          );
        },
      },
    ],
  },
];
export default Routes;
