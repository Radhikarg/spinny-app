import { ANIME_REQUEST, ANIME_SUCCESS, ANIME_FAILURE } from "./consts";

const initialState = {
  data: [],
  isFetching: false,
  isFetched: false,
  isFailure: false,
};

export default function AnimeReducer(state = initialState, action) {
  switch (action.type) {
    case ANIME_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFailure: false,
      };
    }
    case ANIME_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        isFetching: false,
        isFetched: true,
        isFailure: false,
      };
    }
    case ANIME_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFailure: true,
      };
    }
    default:
      return state;
  }
}
