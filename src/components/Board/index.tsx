import { useState, useContext } from "react";
import { BoardDetails, Subtask, Task } from "@/types";
import { StyledBoardWrapper, StyledColumnTasksWrapper, StyledNewColumn, StyledTask } from "./StyledComponents";
import MediumHeading from "../typography/MediumHeading";
import MediumBoldBodyText from "../typography/MediumBoldBodyText";
import withDraggable from "@/components/dnd/draggableHOC";
import withDroppable from "@/components/dnd/droppableHOC";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import _ from "lodash";
import Modal from "@/components/Modal";
import TaskDetails from "@/components/TaskDetails";
import EditTask from "@/components/UpdateOrCreateNewTask";
import DeleteTask from "../DeleteTask";
import { BoardContext } from "@/context/BoardContext";

const Board = () => {
  const { boardDetails } = useContext(BoardContext)!;
  const [boardColumns, setBoardColumns] = useState(() => {
    if (boardDetails.data) {
      return boardDetails.data.columns;
    }
    return null;
  });

  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [isEditTaskDetailsModalOpen, setIsEditTaskDetailsModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  function dragEndEventHandler(result: DropResult) {
    // adjust order of tasks in columns based on where the task is dragged
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
      boardColumns!.forEach((column, columnIndex) => {
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
        columns!.forEach((column, columnIndex) => {
          if (columnIndex === sourceColumnIndex) {
            column.tasks = column.tasks.filter((task) => task.id !== taskId);
          }
        });
        // add the task to new position
        columns!.forEach((column) => {
          if (column.id === destinationColumnId) {
            column.tasks.splice(tasknewIndex, 0, task!);
          }
        });
        return columns;
      });
    }
  }
  return (
    <StyledBoardWrapper>
      <DragDropContext onDragEnd={dragEndEventHandler}>
        {boardColumns &&
          boardColumns.map((column) => {
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
                        const totalSubTasks = task.subtasks?.length || 0;
                        const subTasksDone = task.subtasks && task.subtasks.filter((x) => x.isDone).length;
                        return (
                          <StyledTask
                            onClick={() => {
                              setSelectedTask(task);
                              setIsTaskDetailsModalOpen(true);
                            }}
                          >
                            <MediumHeading>{task.title}</MediumHeading>
                            <MediumBoldBodyText isPrimary={false}>
                              {totalSubTasks > 0 ? `${subTasksDone} of ${totalSubTasks} subtasks` : null}
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
      {/* modals */}
      <Modal isOpen={isTaskDetailsModalOpen} setIsOpen={setIsTaskDetailsModalOpen}>
        {selectedTask && (
          <TaskDetails
            id={selectedTask.id}
            title={selectedTask.title}
            boardColumns={boardColumns!}
            status_={selectedTask.columnId}
            description={selectedTask.description as null}
            subtasks_={selectedTask.subtasks as null}
            userActions={[
              {
                title: "Edit",
                isDangerAction: false,
                onClick: () => {
                  setIsTaskDetailsModalOpen(false);
                  setIsEditTaskDetailsModalOpen(true);
                },
              },
              {
                title: "Delete",
                isDangerAction: true,
                onClick: () => {
                  setIsTaskDetailsModalOpen(false);
                  setIsDeleteTaskModalOpen(true);
                },
              },
            ]}
          />
        )}
      </Modal>
      <Modal isOpen={isEditTaskDetailsModalOpen} setIsOpen={setIsEditTaskDetailsModalOpen}>
        {selectedTask && (
          <EditTask
            onSubmit={(data) => {
              console.log(data);
              setIsEditTaskDetailsModalOpen(false);
            }}
            boardColumns={boardColumns!}
            initialValues={selectedTask!}
          />
        )}
      </Modal>
      <Modal isOpen={isDeleteTaskModalOpen} setIsOpen={setIsDeleteTaskModalOpen}>
        {selectedTask && (
          <DeleteTask
            id={selectedTask.id}
            title={selectedTask.title}
            onSubmit={(id) => {
              setIsDeleteTaskModalOpen(false);
            }}
          />
        )}
      </Modal>
    </StyledBoardWrapper>
  );
};

export default Board;
