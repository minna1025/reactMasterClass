import { atom, selector } from "recoil";

export const TopMovies = atom<any>({
  key: "topMovies",
  default: { results: [] },
});

export const TopMovieId = selector({
  key: "mainBanner",
  get: ({ get }) => {
    const topList = get(TopMovies);
    return topList?.results[0]?.id;
  },
});

export const Genresmovie = atom<any>({
  key: "genresMovie",
  default: null,
});

export const GenresTv = atom<any>({
  key: "genresTv",
  default: null,
});
