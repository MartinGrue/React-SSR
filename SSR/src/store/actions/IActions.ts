import { IUser, ICurrentUser } from "../../app/models/IUser";

export type usersActions =
  | { type: "fetch_users"; payload: IUser[] }
  | { type: "fetch_current_user"; payload: ICurrentUser }
  | { type: "sign_in"; payload: IUser };

