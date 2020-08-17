export interface IUser {
  id: string;
  name: string;
}
export interface IUserRequest {
  name: string;
  password: string;
}
export interface ICurrentUser {
  currentUser: {
    userId: number;
    name: string;
    iat: number;
  } | null;
}
