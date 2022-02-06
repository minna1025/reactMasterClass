import { AnimatePresence, motion } from "framer-motion";
import { isAbsolute } from "path/posix";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { makeImagePath } from "../libs";

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  overflow: hidden;
  height: 145px;
  font-size: 66px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;

  h4 {
    text-align: left;
    margin: 10px 20px;
    font-size: 18px;
  }

  ul {
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 5px 20px;
  }

  li {
    font-size: 14px;
  }
`;

interface IBoxProps {
  id: number;
  title: string;
  bgImage: string;
  bgSize: string;
  sliderType: string;
  genres?: any;
}

const boxVariants = {
  normal: {
    scale: 1,
  },

  hover: {
    scale: 1.3,
    y: -50,
    height: "250px",

    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    height: "100px",

    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

function Slide({ id, title, bgImage, bgSize, sliderType, genres }: IBoxProps) {
  const history = useNavigate();
  const onBoxClicked = (id: number) => {
    history(`/movies/${id}`);
  };

  return (
    <>
      <Box
        key={sliderType + id}
        whileHover="hover"
        initial="normal"
        variants={boxVariants}
        transition={{ type: "tween" }}
        bgphoto={makeImagePath(bgImage, bgSize)}
        onClick={() => onBoxClicked(id)}>
        <Info variants={infoVariants}>
          <h4>{title}</h4>
          <ul>
            {genres.map((genre: string) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </Info>
      </Box>
    </>
  );
}

export default React.memo(Slide);
