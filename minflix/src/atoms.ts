import { atom, selector } from "recoil";
import { IGetTopMovieResult, getVideo } from "./api";

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
