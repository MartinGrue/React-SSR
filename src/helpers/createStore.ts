
import { initialState } from "../client/reducers/usersReducer";
import { configureStore } from "../client/reducers/configureStore";
// import reducers from "../client/reducers/index";
export default () => {
    const store = configureStore(initialState);
    return store;
};
