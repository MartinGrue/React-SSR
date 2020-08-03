import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import { User } from "./models/User";
import { seedData } from "./seed";
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
User.find({}, (err, users) => {
  users.length === 0 ? seedData() : null;
});
// console.log(users);
app.use(userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("Im listening");
});
