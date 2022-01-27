import { useRecoilValue } from "recoil";
import { ToDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const toDos = useRecoilValue(ToDoState);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          // <ToDo text={toDo.text} id={toDo.id} category={toDo.category} />
          <ToDo key={toDo.id} {...toDo} /> // awesome!!!
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
