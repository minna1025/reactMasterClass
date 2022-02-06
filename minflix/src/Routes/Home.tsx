import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getGenres, getMovies, IGenres, IGetTopMovieResult } from "../api";
import { makeImagePath } from "../libs";
import ModalMovieInfo from "../Components/ModalMovieInfo";
import Slider from "../Components/Slider";
import Trailer from "../Components/Trailer";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Genres } from "../atoms";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  overflow: hidden;
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
  margin-bottom: 20px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Overview = styled.p`
  z-index: 1;
  font-size: 20px;
  width: 50%;
`;

function Home() {
  const { data: topMoviesData, isLoading: isTopMovieLoading } =
    useQuery<IGetTopMovieResult>(["", ""], () => getMovies("popular"));

  const { data: genresList, isLoading: isGenresLoading } = useQuery<IGenres>(
    [],
    () => getGenres()
  );
  const [, setGenres] = useRecoilState(Genres);

  const bigMovieMatch = useMatch("/movies/:movieId");
  const clickedMovie = bigMovieMatch?.params.movieId;

  const [, setIsClicked] = useState(false);
  const history = useNavigate();

  const onOverlayClick = () => {
    toggleisClicked();
    history("/");
  };

  const toggleisClicked = () => setIsClicked((prev) => !prev);

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
            <Slider sliderTitle="최근 등록" sliderType="now_playing" />
            <Slider sliderTitle="지금뜨는 콘텐츠" sliderType="popular" />
            <Slider sliderTitle="개봉 예정" sliderType="upcoming" />
          </SliderWrapper>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  initial={{ zIndex: 5 }}
                  onClick={onOverlayClick}
                  animate={{ opacity: 1, zIndex: 5 }}
                  exit={{ opacity: 0 }}
                />
                <ModalMovieInfo id={Number(clickedMovie)} />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Home);
