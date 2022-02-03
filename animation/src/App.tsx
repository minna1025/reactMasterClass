import GlobalStyle from "./GlobalStyle";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 20px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);

  return (
    <Wrapper>
      <GlobalStyle />
      <button onClick={() => x.set(200)}>click me</button>
      <Box
        style={{ x }}
        drag="x"
        dragSnapToOrigin // 드래그 후 원자세로 다시 백
      ></Box>
    </Wrapper>
  );
}

export default App;
