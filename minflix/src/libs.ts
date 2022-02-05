import { API_KEY } from "./api";

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${
    format ? format : "original"
  }/${id}?api_key=${API_KEY}&language=ko&append_to_response=images&include_image_language=ko,null`;
}
