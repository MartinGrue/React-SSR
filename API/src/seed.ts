import mongoose, { Schema, Document, Model, model } from "mongoose";
import { User } from "./models/User";

export const seedData = () => {
  const users = [
    { name: "tia" },
    { name: "nemo" },
    { name: "tom" },
    { name: "jerry" },
  ];

  User.insertMany(users);
};
