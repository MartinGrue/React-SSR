import React from "react";
import { appStore } from "../store/configure/configureStore";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import Header from "./Header";
import { fetchCurrentUser } from "../store/actions/userthunks";

const App: React.FC<RouteConfigComponentProps> = ({ route }) => {
  return (
    <div>
      <Header></Header>
      {renderRoutes(route?.routes)}
    </div>
  );
};

export default {
  component: App,
  loadData: (store: appStore) => {
    return store.dispatch(fetchCurrentUser());
  },
};
