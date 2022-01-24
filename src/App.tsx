import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  // const [value, setValue] = useState("");
  // const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   const {
  //     currentTarget: { value },
  //   } = event;
  //   setValue(value);
  // };
  // const onSubmit = () => {};

  return (
    <div>
      {/* <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          console.log("hello", value);
        }}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form> */}
      <Container>
        <H1>protected</H1>
      </Container>
    </div>
  );
}

export default App;
