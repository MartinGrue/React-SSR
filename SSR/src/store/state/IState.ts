import { IUser } from "../../app/models/IUser";

export type usersState = {
  users: IUser[];
  isLoggedIn: boolean;
};
