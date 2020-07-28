import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { MyState } from "../client/reducers";
import {fetchUsers} from "./../client/actions/actions"
const mapState = (state: MyState) => ({
  users: state.users,
});

const mapDispatch = {
  toggleOn: () => ({ type: "fetch_users" }),
};
const connector = connect(mapState, {fetchUsers});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  backgroundColor: string;
};

const Home: React.FC<Props> = ({ users, fetchUsers }) => {
  return (
    <div>
      <p>Hi from home</p>
      {/* <ul>
        {users.map((v, i) => {
          <li>{v.id}</li>;
        })}
      </ul> */}
      <button onClick={fetchUsers}></button>
    </div>
  );
};

export default connector(Home);
