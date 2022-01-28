import { useSetRecoilState } from "recoil";
import { Categories, IToDo, ToDoState } from "../atoms";

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
    <li>
      {text}
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
        // <button onClick={onClick} name="DOING">Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
      <button onClick={() => deleteToDo(id)}>🗑️</button>
    </li>
  );
}

export default ToDo;
