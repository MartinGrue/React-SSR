import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { usersState } from "../store/state/IState";
import {
  fetchUsers,
  MyThunkDispatch,
  fetchUsersSlow,
  MyThunkResult,
} from "../store/actions/userthunks";
import { withRouter } from "react-router-dom";
import { Store, bindActionCreators, Dispatch, AnyAction } from "redux";
import { usersActions } from "../store/actions/IActions";
const mapState = (state: usersState) => {
  console.log(`From the stateMapper: ${state.users.map((v) => v.name)}`);
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

type Props = PropsFromRedux & {
  backgroundColor: string;
};

const Home: React.FC<PropsFromRedux> = ({ fetchUsers, users }) => {
  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);
  if (users.length === 0) {
    return <p>Hi from Home</p>;
  } else {
    console.log(`from the component: ${users[0].name}`);

    return (
      <div>
        <p>Hi from Home</p>
        {users.map((v, i) => {
          return <p key={v.id}>{v.name}</p>;
        })}
        <p>{users[0].name}</p>
        {/* <button onClick={fetchUsers}></button> */}
      </div>
    );
  }
};
export const loadData = () => {
  console.log("im loading data on the server");
};

export default {
  component: connector(Home),
  loadData: (store: Store<usersState, usersActions>) => {
    interface ActionDispatchs {
      fetchUsers: MyThunkDispatch;
      fetchUsersSlow: MyThunkDispatch;
    }
    const actions: ActionDispatchs = bindActionCreators(
      {
        fetchUsers,
        fetchUsersSlow,
      },
      store.dispatch as Dispatch<AnyAction>
    );

    return actions.fetchUsersSlow(fetchUsersSlow());
    // console.log("this is a store")
    // console.log(store)
  },
  // setTimeout(() => {
  //   console.log("Im loading Home data");
  // }, 3000    )
};
