export const API_KEY = "6168f76b6e8e811fa14c2c1d50c8ec66";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  genre_ids: [
    {
      id: number;
      name: string;
    }
  ];
  vote_average?: number;
}

export interface ITv {
  adult: boolean;
  backdrop_path: string;
  genres: [{ id: number; name: string }];
  id: number;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
  };
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  poster_path: string;
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
    }
  ];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
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

export interface IGetTvResult {
  dates: {
    maximum: string;
    minmum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface IDetail {
  adult: boolean;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
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
  name: string;
  vote_average: number;
  runtime: number;
  overview: string;
  first_air_date: string;
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

export function getMovies(type: string, movieType: string) {
  return fetch(
    `${BASE_PATH}/${type}/${movieType}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getVideo(movieId: number) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getDetail(type: string, movieId: number) {
  return fetch(
    `${BASE_PATH}/${type}/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getGenres(type: string) {
  return fetch(
    `${BASE_PATH}/genre/${type}/list?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getSimilar(type: string, movieId: number) {
  return fetch(
    `${BASE_PATH}/${type}/${movieId}/similar?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getSearch(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&include_adult=false&query=${keyword}`
  ).then((response) => response.json());
}
