import { configureStore } from "../store/configure/configureStore";
import { usersInitialState } from "../store/reducers/usersReducer";

export default () => {
    const store = configureStore(usersInitialState);
    return store;
};
