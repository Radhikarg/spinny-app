import { ANIME_REQUEST } from "./consts";

export const requestAnime = (payload) => ({
  type: ANIME_REQUEST,
  payload,
});
