import { combineReducers } from "redux";
import repoReducer from "./repo";
import userReducer from "./user";

const rootReducer = combineReducers({
    user: userReducer,
    repo: repoReducer
});

export default rootReducer;