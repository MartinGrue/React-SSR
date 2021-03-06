import { usersState } from "../state/IState";
import { usersActions } from "../actions/IActions";
import { Reducer } from "redux";

export const usersInitialState: usersState = {
  users: [],
  currentUser: { currentUser: null },
};

const reducer: Reducer<usersState, usersActions> = (
  state: usersState = usersInitialState,
  action: usersActions
): usersState => {
  switch (action.type) {
    case "fetch_users":
      return { ...state, users: action.payload };
    case "fetch_current_user":
      return { ...state, currentUser: action.payload };
    case "sign_in":
      return {
        ...state,
        currentUser: {
          currentUser: {
            userId: action.payload.id,
            name: action.payload.name,
            iat: 13123,
          },
        },
      };
    default:
      return state;
  }
};
export default reducer;
