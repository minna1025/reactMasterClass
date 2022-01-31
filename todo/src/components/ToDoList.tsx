import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import SelectCategory from "./SelectCategory";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const ToDoWrapper = styled.div`
  max-width: 450px;
  max-height: 500px;
  width: 100%;
  height: 100%;
  padding: 30px 10px;

  h1 {
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
  }

  span {
    font-size: 12px;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const category = useRecoilValue(categoryState);

  return (
    <ToDoWrapper>
      <h1>{category}</h1>
      <hr />
      <span>카테고리를 골라봐: </span>
      <SelectCategory />
      <br />
      <span>너는 이걸 해야해🔥</span>
      <CreateToDo />
      {toDos.length > 0 ? (
        toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)
      ) : (
        <p>🙅 아무것도 없음 🙅</p>
      )}
    </ToDoWrapper>
  );
}

export default ToDoList;
