import { RouteConfig } from "react-router-config";
import { appStore } from "../store/configure/configureStore";
import UsersPage from "../pages/UsersPage";
import HomePage from "../pages/HomePage";

const Routes: RouteConfig[] = [
  {
    component: UsersPage.component,
    path: "/users",
    routes: [
      {
        component: UsersPage.component,
        loadData: (store: appStore) => {
          return UsersPage.loadData(store);
        },
        path: "/users",
      },
    ],
  },
  {
    component: HomePage,
    path: "/home",
    routes: [
      {
        component: HomePage,
        loadData: () => {
          console.log("Im loading HI data");
        },
        path: "/home",
      },
    ],
  },
];
export default Routes;
