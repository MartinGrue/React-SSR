import { IUser, ICurrentUser } from "../../app/models/IUser";

export type usersState = {
  users: IUser[];
  currentUser: ICurrentUser
};