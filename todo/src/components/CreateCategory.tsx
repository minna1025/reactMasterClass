import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CategoryListState } from "../atoms";

const Form = styled.form`
  max-width: 450px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

interface IForm {
  newCategory: string;
}

function CreateToDo() {
  const setNewCategory = useSetRecoilState(CategoryListState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ newCategory }: IForm) => {
    setNewCategory((categories) => [{ name: newCategory }, ...categories]);

    setValue("newCategory", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValue)}>
      <input
        {...register("newCategory", {
          required: "Please write a New Category",
        })}
        type="text"
        placeholder="Write a new category do"
      />
      <button>Add</button>
    </Form>
  );
}

export default CreateToDo;
