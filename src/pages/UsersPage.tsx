import { usersState } from "../store/state/IState";
import {
  MyThunkDispatch,
  fetchUsers,
  fetchUsersSlow,
} from "../store/actions/userthunks";
import { connect } from "react-redux";
import { ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { appStore } from "../store/configure/configureStore";
import React from "react";

const mapState = (state: usersState) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchUsersSlow: () => dispatch(fetchUsersSlow()),
});
const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface UsersPageProps extends PropsFromRedux {}

const HomePage: React.FC<UsersPageProps> = ({ fetchUsers, users }) => {
  useEffect(() => {
    fetchUsers();
  }, []);
  if (users.length === 0) {
    return <p>Hi from UsersPage</p>;
  } else {
    return (
      <div>
        <p>Hi from UsersPage</p>
        {users.map((v, i) => {
          return <p key={v.id}>{v.name}</p>;
        })}
        <p>{users[0].name}</p>
      </div>
    );
  }
};
export default {
  component: connector(HomePage),
  loadData: (store: appStore) => {
    return store.dispatch(fetchUsers());
  },
};
