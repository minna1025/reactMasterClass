import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const ToDoState = atom<IToDo[]>({
  key: "ToDo",
  default: [],
});

interface IForm {
  toDo: string;
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(ToDoState);
  // const value = useRecoilValue(ToDoState);
  // const modFun = useSetRecoilState(ToDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValue)}>
        <input
          {...register("toDo", { required: "Please write a To Do" })}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
