import express, { Response, Request } from "express";
import Renderer from "./helpers/Renderer";
import { matchRoutes } from "react-router-config";
import Routes from "./components/Routes";
import { configureStore } from "./store/configure/configureStore";
import proxy from "express-http-proxy";
import axios from "axios";
import createCustomAxios from "./app/api/createCustomAxios";
const apiUrl = `http://localhost:4000`;
// const apiUrl = `https://whispering-cove-81970.herokuapp.com`;
const app = express();

app.use("/api", proxy(apiUrl));
app.use(express.static("public"));
app.get("*", async (req: Request, res) => {
  console.log("starting");
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: { cookie: req.get("cookie") || "" },
  });

  const agent = createCustomAxios(axiosInstance);
  const store = configureStore(undefined, agent);

  const preloaded = matchRoutes(Routes, req.url);
  console.log("preloaded: ", preloaded);
  const promises = preloaded.map(({ route, match }) => {
    console.log("route loaddata:", route.loadData);
    console.log(typeof route.loadData);
    return route.loadData ? route.loadData(store) : Promise.resolve(null);
  });
  await Promise.all(promises).then((data) => {
    // console.log(data);
    console.log("load data done");
    res.send(Renderer(req, store));
  });
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
