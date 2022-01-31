import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, ToDoState } from "../atoms";

const List = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  overflow: hidden;

  span {
    flex: 1;
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(ToDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    const currentTarget = newCategory;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id); // props id와 비교
      const newToDo = { text, id, category: currentTarget };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  /* const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: {name} } = event;
  console.log('i wanna go', event.currentTarget.name)
  } */

  const deleteToDo = (id: number) => {
    setToDos((oldToDos) => {
      return oldToDos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <List>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
        // <button onClick={onClick} name="DOING">Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
      <button onClick={() => deleteToDo(id)}>🗑️</button>
    </List>
  );
}

export default ToDo;
