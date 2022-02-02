import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IDroppableProps, toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const Boards = styled.div<IDroppableProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (source.droppableId === "boardDroppable") return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allboard) => {
        const boardCopy = [...allboard[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);

        return {
          ...allboard,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="boardDroppable" type="board">
          {(provi, snapshot) => (
            <Boards
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={provi.innerRef}
              {...provi.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {provi.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
