import { takeEvery, call, put } from "redux-saga/effects";
import { ANIME_REQUEST, ANIME_SUCCESS, ANIME_FAILURE } from "./consts";
import { getAnime } from "./api";

function* FetchAnime(action) {
  try {
    const response = yield call(getAnime, action.payload);
    const data = response.results;

    yield put({
      type: ANIME_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: ANIME_FAILURE,
      payload: {
        error: e.message || "Failure in fetching the hub closing stock data.",
      },
    });
  }
}

export default function* main() {
  yield takeEvery(ANIME_REQUEST, FetchAnime);
}
