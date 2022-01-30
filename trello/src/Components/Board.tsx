import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IDroppableProps, ITodo, toDoState } from "../atoms";
import DraggableCard from "./DragabbleCard";
import { BsTrash } from "react-icons/bs";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 0 0;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IDroppableProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#C9CCD5"
      : props.isDraggingFromThis
      ? "#E4D8DC"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  text-align: center;

  input {
    width: 80%;
    margin: 0 auto;
    background-color: #c9ccd5;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
  }
`;

const Trash = styled.div<IDroppableProps>`
  grid-column: 1/4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 0;
  width: 300px;
  font-size: 80px;
  color: ${(props) => (props.isDraggingOver ? "#FFE3E3" : "gray")};

  div {
    display: none;
    width: 0;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <>
      {boardId !== "Trash" ? (
        <Wrapper>
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId}>
            {(magic, snapshop) => (
              <Area
                isDraggingOver={snapshop.isDraggingOver}
                isDraggingFromThis={Boolean(snapshop.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      ) : (
        <Droppable droppableId="Trash">
          {(magic, snapshot) => (
            <Trash
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}>
              <BsTrash />
              {/* {magic.placeholder} */}
            </Trash>
          )}
        </Droppable>
      )}
    </>
  );
}

export default Board;
