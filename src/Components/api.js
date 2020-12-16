import fetch from "../utils/fetchUtils";

export const getAnime = (payload) => {
  return fetch(
    `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/anime?${payload}`,
    {
      method: "GET",
    }
  );
};

// https://cors-anywhere.herokuapp.com/ --> added just to avoid CORS blockage of HTTPS on localhost
