import React from "react";
import { Link } from "react-router-dom";
import { usersState } from "../store/state/IState";
import {
  MyThunkDispatch,
  fetchUsers,
  fetchCurrentUser,
  signIn,
} from "../store/actions/userthunks";
import { ConnectedProps, connect } from "react-redux";
import { IUser, IUserRequest } from "../app/models/IUser";

const mapState = (state: usersState) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  signIn: (user: IUserRequest) => dispatch(signIn(user)),
});
const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface UsersPageProps extends PropsFromRedux {}
const Header: React.FC<UsersPageProps> = ({
  currentUser,
  fetchCurrentUser,
  signIn,
}) => {
  console.log(`currentUser in component : ${currentUser.currentUser?.name}`);
  return (
    <div>
      <Link to="/">React SSR</Link>

      {currentUser.currentUser ? (
        <p>{`HI ${currentUser.currentUser?.name}`}</p>
      ) : (
        // <a href="/api/auth/google" style={{ display: "block" }}>
        //   LogIn
        // </a>
        <p>{`HI unknown`}</p>
      )}
      <button
        onClick={() => {
          signIn({ name: "tia", password: "asdf" }).then((response) => {
            console.log("this is signIn response: ", response);
          });
        }}
      >
        Login
      </button>
    </div>
  );
};
export default connector(Header);
