import { combineReducers } from "redux";
import AnimeReducer from "./Components/reducers";

export default function createReducer(asyncReducers) {
  const appReducer = combineReducers({
    AnimeReducer,
    ...asyncReducers,
  });
  return (state, action) => appReducer(state, action);
}
