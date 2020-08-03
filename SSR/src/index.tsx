import express from "express";
import Renderer from "./helpers/Renderer";
import { matchRoutes } from "react-router-config";
import Routes from "./components/Routes";
import {
  configureStore,
  createAppStore,
} from "./store/configure/configureStore";
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

app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createAppStore();
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
