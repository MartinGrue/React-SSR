import Home, { loadData } from "./Home";
import { RouteConfig } from "react-router-config";
import React from "react";
import { Test } from "./Test";
import Renderer from "../helpers/Renderer";
const Routes: RouteConfig[] = [
  {
    component: Home.component,
    path: "/home",
    routes: [
      {
        component: Home.component,
        loadData: (store:any) => {
          console.log("Im loading home data");
          return Home.loadData(store)
        },
        path: "/home",
      },
    ],
  },
  {
    component: Test,
    path: "/test",
    routes: [
      {
        component: Test,
        loadData: () => {
          console.log("Im loading HI data");
        },
      },
    ],
  },
];
export default Routes;
