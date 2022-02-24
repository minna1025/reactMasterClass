import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getGenres,
  getMovies,
  IGenres,
  IMovie,
  ITv,
  IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../libs";
import ModalMovieInfo from "../Components/ModalMovieInfo";
import Slider from "../Components/Slider";
import Trailer from "../Components/Trailer";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { GenresTv } from "../atoms";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  background-color: black;
  padding-bottom: 200px;
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
  padding: 60px;
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
  margin-top: -170px;

  > div {
    margin: 3vw 0;
    padding: 0 60px;
  }
`;

const Title = styled.h2`
  z-index: 1;
  font-size: 68px;
  margin-bottom: 1.25rem;
`;

const Overlay = styled(motion.div)`
  z-index: 0;
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

function Tv() {
  const location = useLocation();
  const { data: topTvData, isLoading: isTopTvLoading } =
    useQuery<IGetMoviesResult>("tvData", () => getMovies("tv", "popular"));

  const { data: genresList, isLoading: isGenresLoading } = useQuery<IGenres>(
    ["genresTv", location],
    () => getGenres("tv")
  );
  const [, setGenres] = useRecoilState(GenresTv);

  const bigMovieMatch = useMatch("/tv/:movieId");
  const clickedMovie = bigMovieMatch?.params.movieId;

  useEffect(() => {
    if (!isGenresLoading) {
      setGenres(genresList?.genres);
    }
  }, [isGenresLoading]);

  return (
    <Wrapper>
      {isTopTvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner>
            <img
              src={makeImagePath(topTvData?.results[0]?.backdrop_path || "")}
            />
            {/* {topMoviesData?.results[0].id ? (
              <Trailer movieId={topMoviesData?.results[0].id} />
            ) : null} */}
            <Title>{topTvData?.results[0]?.name}</Title>
            <Overview>{topTvData?.results[0]?.overview}</Overview>
          </Banner>
          <SliderWrapper>
            <Slider sliderTitle="별점 높은" sliderType="top_rated" type="tv" />
            <Slider
              sliderTitle="지금 상영중"
              sliderType="on_the_air"
              type="tv"
            />
            <Slider
              sliderTitle="오늘 방송"
              sliderType="airing_today"
              type="tv"
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
                <ModalMovieInfo id={Number(clickedMovie)} type="tv" />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Tv);
