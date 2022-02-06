import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { Genres } from "./atoms";

export const API_KEY = "6168f76b6e8e811fa14c2c1d50c8ec66";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genre_ids: [
    {
      id: number;
      name: string;
    }
  ];
}
export interface IGetTopMovieResult {
  results: IMovie[];
}

interface IVideoResult {
  name: string;
  key: string;
  id: string;
}

export interface IVideo {
  id: number;
  results: IVideoResult[];
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minmum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IDetail {
  adult: boolean;
  backdrop_path: string;
  genres?: {
    id: number;
    name: string;
  };
  id: number;
  popularity: number;
  release_date: string;
  spoken_languages?: [
    {
      name: string;
      iseo_639_1: string;
    }
  ];
  tagline: string;
  title: string;
  vote_average: number;
}

export interface IGenres {
  find(arg0: (i: any) => boolean): any;
  filter(arg0: (i: any) => boolean): any;
  genres?:
    | [
        {
          id: number;
          name: string;
        }
      ]
    | undefined
    | null;
}

export function getMovies(movieType: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieType}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getVideo(movieId: number) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getDetail(movieId: number) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getGenres() {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
