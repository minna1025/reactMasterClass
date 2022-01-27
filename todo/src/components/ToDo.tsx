import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, ToDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(ToDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    const currentTarget = newCategory;
    console.log(newCategory);
  };
  /* const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: {name} } = event;
  console.log('i wanna go', event.currentTarget.name)
  } */

  return (
    <li>
      {text}
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
    </li>
  );
}

export default ToDo;
