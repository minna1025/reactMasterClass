import GlobalStyle from "./GlobalStyle";
import TodoList from "./components/ToDoList";
import CreateCategory from "./components/CreateCategory";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <CreateCategory />
      <TodoList />
    </Wrapper>
  );
}

export default App;
