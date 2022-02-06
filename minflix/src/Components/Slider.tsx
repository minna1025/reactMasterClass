import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import Slide from "./Slide";

const Wrapper = styled.div`
  position: relative;
  min-height: 200px;
  height: 100%;

  > h2 {
    font-size: 25px;
    margin-bottom: 10px;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Row = styled(motion.div)`
  position: relative;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
`;

const ButtonNext = styled(motion.div)`
  z-index: 99;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 200px;
  cursor: pointer;
  bottom: 0;
  font-size: 70px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3));
`;

interface ISlider {
  sliderTitle: string;
  sliderType: string;
}

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5, // 사용자의 윈도우 너비 + gap
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const NextVariants = {
  hover: {
    background:
      "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7))",
  },
  exite: { background: "transparent" },
};

const offset = 6;

function Slider({ sliderTitle, sliderType }: ISlider) {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    [sliderType + "movies", sliderType],
    () => getMovies(sliderType)
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false); // 다중 클릭 했을 시 애니매이션이 중복 되는 것을 조정(애니메이션 아웃을 완료하면 다음 실행)

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      toggleLeaving();
      const totalMovie = data?.results.length - 1; // 메인 영화 1개 뺌
      const maxIndex = Math.floor(totalMovie / offset); // ceil : 내림, floor: 버림
      setIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving(false);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <h2>{sliderTitle}</h2>
          {
            // initial={false}를 사용해 첫 로딩 시 슬라이드가 정지해져 있는 모습으로 시작}
            // onExitComplete을 사용해 leaving을 false로 셋팅 해줘서 한번클릭 후 애니메이션이 작동하지 않는 것을 수정
          }
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={sliderType}>
              {data?.results && data?.results.length > 2
                ? data?.results
                    .slice(data?.results.length % 3 === 1 ? 1 : 2)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Slide
                        sliderType={sliderType}
                        key={sliderType + movie.id}
                        id={movie.id}
                        title={movie.title}
                        bgImage={movie.backdrop_path}
                        bgSize={"w500"}
                      />
                    ))
                : null}
            </Row>
          </AnimatePresence>
          <ButtonNext
            onClick={increaseIndex}
            variants={NextVariants}
            initial="start"
            exit="exit"
            whileHover="hover">
            &#8250;
          </ButtonNext>
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Slider);
