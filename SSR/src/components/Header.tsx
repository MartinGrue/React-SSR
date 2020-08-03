import React from "react";
import { Link } from "react-router-dom";
import { usersState } from "../store/state/IState";
import {
  MyThunkDispatch,
  fetchUsers,
  fetchCurrentUser,
} from "../store/actions/userthunks";
import { ConnectedProps, connect } from "react-redux";

const mapState = (state: usersState) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
});
const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface UsersPageProps extends PropsFromRedux {}
const Header: React.FC<UsersPageProps> = ({ isLoggedIn, fetchCurrentUser }) => {
  console.log(`my auth status: ${isLoggedIn}`);
  return (
    <div>
      <Link to="/">React SSR</Link>

      {isLoggedIn ? (
        <a href="/api/auth/logout" style={{ display: "block" }}>
          Logout
        </a>
      ) : (
        // <a href="/api/auth/google" style={{ display: "block" }}>
        //   LogIn
        // </a>
        <button
          onClick={() => {
            fetchCurrentUser();
            console.log(`isloggend in in comp: ${isLoggedIn}`);
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};
export default connector(Header);
