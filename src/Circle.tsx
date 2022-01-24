import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string; // required
  borderColor: string; // required
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string; // required
  borderColor?: string; // optional props
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  //useState 초기값으로 기본 타입을 알아서 추측함. 하지만 다른 타입으로 사용하고 싶을때는 아래처럼하면됨
  const [counter, setCounter] = useState<number | string>(1);
  setCounter(2);

  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
