import { atom, DefaultValue, selector } from "recoil";

export interface ICategories {
  name: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: IToDo) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
  effects_UNSTABLE: [localStorageEffect("slectedCategory")],
});

export const ToDoState = atom<IToDo[]>({
  key: "ToDo",
  default: [],
  effects_UNSTABLE: [localStorageEffect("todoList")],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(ToDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const CategoryListState = atom<ICategories[]>({
  key: "Categories",
  default: [{ name: "TO_DO" }, { name: "DOING" }, { name: "DONE" }],
  effects_UNSTABLE: [localStorageEffect("categories")],
});

export const CategorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    const CategoryList = get(CategoryListState);
    return CategoryList;
  },
});
