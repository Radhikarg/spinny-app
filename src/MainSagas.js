import { fork } from "redux-saga/effects";
import FetchAnimeSaga from "./Components/sagas";

export default function* main() {
  yield fork(FetchAnimeSaga);
}
