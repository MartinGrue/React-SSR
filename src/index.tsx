import express from "express";
import Renderer from "./helpers/Renderer";
import createStore from "./helpers/createStore";
// import createStore from "./helpers/createStore";
const app = express();

app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore();
  res.send(Renderer(req, store));

  // res.send(Renderer(req));
});
app.listen(3001, () => {
  console.log("Listening on prot 3000");
});
