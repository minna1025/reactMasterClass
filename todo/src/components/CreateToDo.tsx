import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ToDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(ToDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValue)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        type="text"
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
