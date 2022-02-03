import GlobalStyle from "./GlobalStyle";
import styled from "styled-components";
import { motion } from "framer-motion";

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
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 20px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Box
        transition={{ type: "spring", delay: 1, bounce: 0.5 }}
        initial={{ scale: 0 }} // 초기값
        animate={{ scale: 1, rotateZ: 360 }}
      />
    </Wrapper>
  );
}

export default App;
