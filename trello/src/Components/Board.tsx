import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 10px 20px;
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

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshop) => (
          <Area
            isDraggingOver={snapshop.isDraggingOver}
            isDraggingFromThis={Boolean(snapshop.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
