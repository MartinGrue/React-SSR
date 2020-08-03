import mongoose, { Schema, Document, Model, model } from "mongoose";
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { collection: "users" }
);
export interface IUser extends Document {
  name: string;
}
export interface IUserModel extends Model<IUser> {}
export const User: IUserModel = model<IUser, IUserModel>("user", userSchema);
