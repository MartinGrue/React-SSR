import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
const app = express();
const hostname = "127.0.0.1";
const port = 3000;
const mongoConnectionString = "'mongodb://localhost:27017'";
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (error: any) => {
  console.error(error);
});
app.use(userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("Im listening");
});
