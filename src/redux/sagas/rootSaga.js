import { all, fork } from "redux-saga/effects";
import themeSaga from "./themeSaga";

export default function* rootSaga() {
  try {
    yield all([fork(themeSaga)]);
  } catch (error) {
    console.error("Root saga error:", error);
  }
}

export { rootSaga };
