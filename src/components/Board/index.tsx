import { BoardDetails } from "@/types";
import { StyledBoardWrapper, StyledColumnTasksWrapper, StyledNewColumn, StyledTask } from "./StyledComponents";
import MediumHeading from "../typography/MediumHeading";
import MediumBoldBodyText from "../typography/MediumBoldBodyText";
import withDraggable from "@/components/dnd/draggableHOC";
import withDroppable from "@/components/dnd/droppableHOC";
import { DragDropContext, DropResult, ResponderProvided } from "@hello-pangea/dnd";
import { useState } from "react";
import _ from "lodash";

const Board = ({ details }: { details: BoardDetails }) => {
  const [boardColumns, setBoardColumns] = useState(details.columns);
  function dragEndEventHandler(result: DropResult, provided: ResponderProvided) {
    // adjust order of tasks in columns based on where the task is dragged
    console.log("drag end event", result, provided);
    const { source, destination } = result;
    if (destination) {
      const taskId = result.draggableId;
      const taskIndex = source.index;
      let task = null;
      let sourceColumnIndex = -1;
      // update
      const destinationColumnId = destination.droppableId;
      let destinationColumnIndex = -1;
      const tasknewIndex = destination.index;
      // find the task
      boardColumns.forEach((column, columnIndex) => {
        if (destinationColumnId === column.id) {
          destinationColumnIndex = columnIndex;
        }
        column.tasks.forEach((item) => {
          if (item.id === taskId) {
            sourceColumnIndex = columnIndex;
            task = _.cloneDeep(item);
          }
        });
      });
      if (sourceColumnIndex === destinationColumnIndex && taskIndex === tasknewIndex) return;
      // update state
      setBoardColumns((previous) => {
        const columns = _.cloneDeep(previous);
        // delete the task
        columns.forEach((column, columnIndex) => {
          if (columnIndex === sourceColumnIndex) {
            column.tasks = column.tasks.filter((task) => task.id !== taskId);
          }
        });
        // add the task to new position
        columns.forEach((column) => {
          if (column.id === destinationColumnId) {
            column.tasks.splice(tasknewIndex, 0, task!);
          }
        });
        console.log("updated columns", columns);
        return columns;
      });
    }
  }
  return (
    <StyledBoardWrapper>
      <DragDropContext onDragEnd={dragEndEventHandler}>
        {boardColumns.map((column) => {
          const Column = () => {
            return (
              <div key={column.id}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <MediumBoldBodyText
                    isPrimary={false}
                  >{`${column.title}  (${column.tasks.length})`}</MediumBoldBodyText>
                </div>

                <StyledColumnTasksWrapper>
                  {column.tasks.map((task, taskIndex) => {
                    const Task = () => {
                      return (
                        <StyledTask>
                          <MediumHeading>{task.title}</MediumHeading>
                          <MediumBoldBodyText isPrimary={false}>
                            {task.totalSubTasks > 0 ? `${task.subTasksDone} of ${task.totalSubTasks} subtasks` : null}
                          </MediumBoldBodyText>
                        </StyledTask>
                      );
                    };
                    const DraggableTask = withDraggable(Task, task.id, taskIndex);

                    return <DraggableTask key={task.id} />;
                  })}
                </StyledColumnTasksWrapper>
              </div>
            );
          };
          const DroppableColumn = withDroppable(Column, column.id);
          return <DroppableColumn key={column.id} />;
        })}
      </DragDropContext>

      <StyledNewColumn />
    </StyledBoardWrapper>
  );
};

export default Board;
