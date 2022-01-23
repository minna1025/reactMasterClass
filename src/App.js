import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;

  ${Emoji} {
    &:hover {
      font-size: 98px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">🤢</Emoji>
      </Box>
      <Emoji>💀</Emoji>
    </Wrapper>
  );
}

export default App;
