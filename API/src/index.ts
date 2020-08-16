import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";

import { User } from "./models/User";
import { seedData } from "./seed";
import { signInRouter, currentUserRouter } from "./routes/auth/";
import { usersRouter } from "./routes/users";
import cookieSession from "cookie-session";

const app = express();
const port = 3000;
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(signInRouter);
app.use(currentUserRouter);
app.use(usersRouter);
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

// console.log(users);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, async () => {
  console.log("Im listening on port:", port);
  await User.find({}, (err, users) => {
    users.length === 0 ? seedData() : null;
  });
});
