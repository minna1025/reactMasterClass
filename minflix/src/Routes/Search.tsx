import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch, IGetTopMovieResult, IMovie } from "../api";
import { makeImagePath } from "../libs";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: black;
  padding: 100px 60px 50px;

  p {
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 150px;
`;

const MovieImage = styled.div`
  width: 100px;
  height: 100%;
  background-size: cover;
`;

interface ISearchMovieResult {
  results: [
    {
      id: number;
      backdrop_path: string;
      poster_path: string;
      title?: string;
      overview: string;
      genre_ids: [
        {
          id: number;
          name: string;
        }
      ];
      vote_average?: number;
      first_air_date: string;
      media_type: string;
      name?: string;
    }
  ];
  total_results: number;
}

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<ISearchMovieResult>(
    ["queryKeyword", keyword],
    () => getSearch(keyword + "")
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <List>
          {data?.total_results ? (
            data?.results.map((movie) => (
              <Item key={movie.id}>
                <MovieImage
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(
        ${makeImagePath(movie?.poster_path, "w500")}
      )`,
                  }}
                />
                <p>{movie.media_type === "movie" ? movie.title : movie.name}</p>
              </Item>
            ))
          ) : (
            <p>{keyword}을/를 찾지 못하였습니다.</p>
          )}
        </List>
      )}
    </Wrapper>
  );
}

export default Search;
