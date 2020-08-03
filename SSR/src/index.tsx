import express from "express";
import Renderer from "./helpers/Renderer";
import { matchRoutes } from "react-router-config";
import Routes from "./components/Routes";
import { configureStore } from "./store/configure/configureStore";
import proxy from "express-http-proxy";
import axios from "axios";
import createCustomAxios from "./app/api/createCustomAxios";
const app = express();

// const loadData = (req: any) => {
//   const preloaded = matchRoutes(Routes, req.url);
//   const promises = preloaded.map(({ route, match }) => {
//     console.log(route.loadData);
//     console.log(typeof route.loadData);
//     return route.loadData ? route.loadData(store) : Promise.resolve(null);
//   });

//   return Promise.all(promises);
// };
app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers!["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);
app.use(express.static("public"));
app.get("*", (req, res) => {
  const axiosInstance = axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com",
    headers: { cookie: req.get("cookie") || "" },
  });

  const agent = createCustomAxios(axiosInstance);
  const store = configureStore(undefined, agent);

  const preloaded = matchRoutes(Routes, req.url);

  const promises = preloaded.map(({ route, match }) => {
    console.log(route.loadData);
    console.log(typeof route.loadData);
    return route.loadData ? route.loadData(store) : Promise.resolve(null);
  });
  Promise.all(promises).then((data) => {
    // console.log(data);
    console.log("load data done");
    res.send(Renderer(req, store));
  });
});
app.listen(3000, () => {
  console.log("Listening on prot 3000");
});
