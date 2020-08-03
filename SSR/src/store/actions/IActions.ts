import { IUser } from "../../app/models/IUser";

export type usersActions = { type: "fetch_users"; payload: IUser[] };