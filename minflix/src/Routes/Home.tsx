import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getGenres, getMovies, IGenres, IGetTopMovieResult } from "../api";
import { makeImagePath } from "../libs";
import ModalMovieInfo from "../Components/ModalMovieInfo";
import Slider from "../Components/Slider";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Genresmovie } from "../atoms";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  background-color: black;
  padding-bottom: 12rem;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 3.75rem;
  background: transparent;

  img {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    );
    background-size: cover;
    width: 100vw;
    height: 100vh;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -10.65rem;

  > div {
    margin: 2.5rem 0;
    padding: 0 3.75rem;
  }
`;

const Title = styled.h2`
  z-index: 1;
  font-size: 4.25rem;
  margin-bottom: 1.25rem;
`;

const Overlay = styled(motion.div)`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: -webkit-fill-available;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Overview = styled.p`
  z-index: 1;
  font-size: 1.25rem;
  width: 50%;
`;

function Home() {
  const location = useLocation();
  const { data: topMoviesData, isLoading: isTopMovieLoading } =
    useQuery<IGetTopMovieResult>("movieData", () =>
      getMovies("movie", "popular")
    );

  const { data: genresList, isLoading: isGenresLoading } = useQuery<IGenres>(
    ["genresMovie", location],
    () => getGenres("movie")
  );
  const [, setGenres] = useRecoilState(Genresmovie);

  const bigMovieMatch = useMatch("/movie/:movieId");
  const clickedMovie = bigMovieMatch?.params.movieId;

  useEffect(() => {
    if (!isGenresLoading) {
      setGenres(genresList?.genres);
    }
  }, [isGenresLoading]);

  return (
    <Wrapper>
      {isTopMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner>
            <img
              src={makeImagePath(topMoviesData?.results[0].backdrop_path || "")}
            />
            {/* {topMoviesData?.results[0].id ? (
              <Trailer movieId={topMoviesData?.results[0].id} />
            ) : null} */}
            <Title>{topMoviesData?.results[0].title}</Title>
            <Overview>{topMoviesData?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <Slider
              sliderTitle="최근 등록"
              sliderType="now_playing"
              type="movie"
            />
            <Slider
              sliderTitle="지금뜨는 콘텐츠"
              sliderType="popular"
              type="movie"
            />
            <Slider
              sliderTitle="개봉 예정"
              sliderType="upcoming"
              type="movie"
            />
          </SliderWrapper>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  initial={{ zIndex: 5 }}
                  animate={{ opacity: 1, zIndex: 5, height: "100%" }}
                  exit={{ opacity: 0 }}
                />
                <ModalMovieInfo id={Number(clickedMovie)} type="movie" />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Home);
