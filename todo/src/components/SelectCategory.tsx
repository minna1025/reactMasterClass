import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { CategoryListState, categoryState } from "../atoms";

const Form = styled.form`
  margin: 5px 0 20px;

  select {
    width: 100%;
    padding: 5px;
  }
`;

function SelectCategory() {
  const [SelectedCategory, setCategorySelect] = useRecoilState(categoryState);
  const categoryList = useRecoilValue(CategoryListState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategorySelect(event.currentTarget.value as any);
  };

  return (
    <Form>
      <select value={SelectedCategory} onInput={onInput}>
        {categoryList.map((category, index) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </Form>
  );
}
export default SelectCategory;
