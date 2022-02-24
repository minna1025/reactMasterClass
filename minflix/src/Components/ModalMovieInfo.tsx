import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../libs";
import {
  getDetail,
  IGetMoviesResult,
  IDetail,
  IGenres,
  getSimilar,
} from "../api";
import { useQuery } from "react-query";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { GenresTv, Genresmovie } from "../atoms";

const Wrap = styled(motion.div)`
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-bottom: 200px;
`;

const BigMovie = styled(motion.div)`
  z-index: 9;
  position: sticky;
  width: 60vw;
  height: 75%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-bottom: 1.25rem;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  background-repeat: no-repeat;
`;

const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
  padding: 1.25rem;
  font-size: 40px;
  overflow-y: auto;
`;

const BigOverview = styled.div`
  position: relative;
  top: -80px;
  padding: 1.25rem;
  line-height: 1.5;
  color: ${(props) => props.theme.white.lighter};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  ul {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;

    li:not(:last-child) {
      &:after {
        display: inline-block;
        content: "";
        width: 1px;
        height: 10px;
        margin-left: 10px;
        background: red;
      }
    }
  }

  h2 {
    margin-top: 50px;
    font-size: 25px;
  }
`;

const Infomation = styled.div`
  display: flex;

  section {
    &:first-child {
      width: 70%;
    }

    &:last-child {
      width: 25%;
      margin-left: 1.25rem;
    }
  }
`;

const Tagline = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
`;

const SimilarMovies = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 10px 1.25rem;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Box = styled.div`
  width: 30%;
  height: fit-content;
  margin-bottom: 1.25rem;
  padding: 0 0 1.25rem;
  border-radius: 5px;
  overflow: hidden;
`;

const SimilarInfo = styled.div`
  width: 100%;
  height: 80px;
  padding: 10px 1.25rem;
  background-color: ${(props) => props.theme.black.lighter};

  h4 {
    font-size: 16px;
    font-weight: 500;
  }

  p {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 1.25rem;
  cursor: pointer;
`;

interface IModal {
  id: number;
  type: string;
}

const modarVariants = {
  start: {
    opacity: 0,
    transition: {
      scale: 0.2,
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      scale: 1,
      duration: 0.5,
    },
  },
  end: {
    opacity: 0,
    transition: {
      scale: 10.2,
      duration: 0.5,
    },
  },
};

function ModalMovieInfo({ id, type }: IModal) {
  const { scrollY } = useViewportScroll();
  const { data: clickedMovie, isLoading: isMovieLoading } = useQuery<IDetail>(
    ["detail" + type, id, type],
    () => getDetail(type, id)
  );
  const { data: similarMovies, isLoading: isSimilarLoading } =
    useQuery<IGetMoviesResult>(["similar" + id + type, id, type], () =>
      getSimilar(type, id)
    );

  const [, setIsClicked] = useState(false);
  const history = useNavigate();

  const onOverlayClick = () => {
    toggleisClicked();
    history(`/${type}`);
  };

  const toggleisClicked = () => setIsClicked((prev) => !prev);

  const genresList = useRecoilValue<IGenres>(
    type !== "movie" ? GenresTv : Genresmovie
  );

  return (
    <Wrap
      onClick={onOverlayClick}
      variants={modarVariants}
      initial="start"
      animate="visible"
      exit="end"
      style={{ paddingTop: scrollY.get() + 100 }}>
      {!isMovieLoading ? (
        <>
          <BigMovie>
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(
        ${makeImagePath(clickedMovie?.backdrop_path, "w500")}
      )`,
                  }}
                />
                <BigTitle>
                  {type === "movie" ? clickedMovie.title : clickedMovie.name}
                </BigTitle>
                <BigOverview>
                  <Close>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="times-circle"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512">
                      <path
                        fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path>
                    </svg>
                  </Close>
                  <Infomation>
                    <section>
                      <ul>
                        {type === "movie" ? (
                          <li>{`${Math.floor(clickedMovie.runtime / 60)}시간 ${
                            clickedMovie.runtime % 60
                          }분`}</li>
                        ) : null}
                        <li>
                          {type === "movie"
                            ? clickedMovie.release_date.slice(0, 4)
                            : clickedMovie.first_air_date.slice(0, 4)}
                        </li>
                        {clickedMovie.vote_average ? (
                          <li>
                            {clickedMovie.vote_average}
                            <Rating
                              style={{ marginLeft: "5px" }}
                              readonly
                              ratingValue={clickedMovie.vote_average * 10}
                              size={20}
                            />
                          </li>
                        ) : null}
                      </ul>
                      <Tagline>{clickedMovie.tagline}</Tagline>
                    </section>
                    <section>
                      <Description>
                        <dl>
                          <dt>장르 :</dt>
                          {clickedMovie.genres.map((genre) => (
                            <dd>{genre.name}</dd>
                          ))}
                        </dl>
                      </Description>
                    </section>
                  </Infomation>
                  {isSimilarLoading ? (
                    <Loader>Loading...</Loader>
                  ) : similarMovies?.total_results &&
                    similarMovies?.total_results > 0 ? (
                    <>
                      <h2>비슷한 콘텐츠</h2>
                      <SimilarMovies>
                        {similarMovies?.results.map((movie) => (
                          <Box key={movie.id}>
                            <div
                              style={{
                                width: "100%",
                                height: "150px",
                                backgroundSize: "cover",
                                backgroundImage: `linear-gradient(to top, black, transparent), url(
                  ${makeImagePath(movie?.backdrop_path, "w500")}
                )`,
                              }}
                            />
                            <SimilarInfo>
                              <h4>
                                {type === "movie" ? movie.title : movie.name}
                              </h4>
                              <p>{movie.overview}</p>
                            </SimilarInfo>
                          </Box>
                        ))}
                      </SimilarMovies>
                    </>
                  ) : null}
                </BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </Wrap>
  );
}

export default ModalMovieInfo;
