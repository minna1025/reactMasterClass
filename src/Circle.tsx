import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;

// interface PlayrShape {
//   name: string;
//   age: string;
// }

// const sayHello = (playerObj) =>
//   `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

// sayHello({ name: "minna", age: 12 });
// sayHello({ name: "nico", age: 12 });
