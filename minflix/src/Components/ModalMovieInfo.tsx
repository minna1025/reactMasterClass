import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../libs";
import { getDetail, IGetMoviesResult, IDetail } from "../api";
import { useQuery } from "react-query";

const Wrap = styled(motion.div)`
  z-index: 5;
`;

const BigMovie = styled(motion.div)`
  z-index: 9;
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  background-repeat: no-repeat;
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
`;

const BigOverview = styled.p`
  position: relative;
  top: -80px;
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IModal {
  id: number;
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

function ModalMovieInfo({ id }: IModal) {
  const { scrollY } = useViewportScroll();
  const { data: clickedMovie, isLoading } = useQuery<IDetail>(
    ["detail", "detail"],
    () => getDetail(id)
  );

  return (
    <Wrap variants={modarVariants} initial="start" animate="visible" exit="end">
      {!isLoading ? (
        <>
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            // layoutId={layout}
          >
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(
        ${makeImagePath(clickedMovie?.backdrop_path, "w500")}
      )`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.tagline}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </Wrap>
  );
}

export default ModalMovieInfo;
