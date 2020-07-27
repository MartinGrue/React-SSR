import express from "express";
import Renderer from "./helpers/Renderer";

const app = express();

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send(Renderer());
});
app.listen(3000, () => {
  console.log("Listening on prot 3000");
});
