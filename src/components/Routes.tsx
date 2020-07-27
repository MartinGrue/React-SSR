import Home from "./Home";
import { RouteConfig } from "react-router-config";

const Routes: RouteConfig[] = [
  {
    component: Home,
    routes: [
      {
        component: Home,
        path: "/",
        exact: true,
      },
    ],
  },
];
export default Routes;
