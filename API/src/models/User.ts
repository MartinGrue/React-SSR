import mongoose, { Schema, Document, Model, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema: Schema<UserDocument> = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);
export interface IUser {
  name: string;
  password: string;
}
interface UserDocument extends Document, IUser {
  comparePassword: (this: IUser, candidatePassword: string) => Promise<unknown>;
}

export interface IUserModel extends Model<UserDocument> {
  build(user: IUser): UserDocument;
}
userSchema.pre<UserDocument>("save", async function save(next) {
  const user = this;
  console.log("in pre save", user.password);
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
userSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};
const User: IUserModel = model<UserDocument, IUserModel>("users", userSchema);
User.build = (userAttributes: IUser) => {
  return new User(userAttributes);
};
export { User };
