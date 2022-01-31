import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, ToDoState } from "../atoms";

const Form = styled.form`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(ToDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);

    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValue)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        type="text"
        placeholder="Write a to do"
      />
      <button>Add</button>
    </Form>
  );
}

export default CreateToDo;
