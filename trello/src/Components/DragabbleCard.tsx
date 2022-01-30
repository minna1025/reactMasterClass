import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#93B5C6" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none"};
  border-radius: 5px;
  margin-bottom: 5px;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshop) => (
        <Card
          isDragging={snapshop.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

// 불필요한 재렌더링이 너무 많아 최적화를 위해 리액트 메모 사용
export default React.memo(DragabbleCard);
