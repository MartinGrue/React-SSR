import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { usersState } from "../store/state/IState";
import { fetchUsers, MyThunkDispatch } from "../store/actions/userthunks";
const mapState = (state: usersState) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});
const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  backgroundColor: string;
};

const Home: React.FC<Props> = ({ fetchUsers }) => {
  useEffect(() => {
    fetchUsers().then(() => {console.log("ThunkAction completed")});
  }, []);
  return (
    <div>
      <p>Hi from Home</p>
      {/* {users && (
        <ul>
          {users.map((v, i) => {
            <li>{v.id}</li>;
          })}
        </ul>
      )} */}

      {/* <button onClick={fetchUsers}></button> */}
    </div>
  );
};

export default connector(Home);
