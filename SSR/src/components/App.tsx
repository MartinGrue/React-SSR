import React from "react";
import { appStore } from "../store/configure/configureStore";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
const App: React.FC<RouteConfigComponentProps> = ({ route }) => {
  return <div>{renderRoutes(route?.routes)}</div>;
};

export default {
  component: App,
  loadData: (store: appStore) => {},
};
