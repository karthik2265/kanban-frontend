import { useState, useContext } from "react";
import { Task } from "@/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import _ from "lodash";
import { BoardContext } from "@/context/BoardContext";
// components
import Modal from "@/components/Modal";
import TaskDetails from "@/components/TaskDetails";
import MediumBoldBodyText from "@/components/typography/MediumBoldBodyText";
import EditTask from "@/components/UpdateOrCreateNewTask";
import DeleteTask from "@/components/DeleteTask";
import LargeHeading from "@/components/typography/LargeHeading";
import MediumHeading from "@/components/typography/MediumHeading";
import ButtonPrimaryLarge from "@/components/buttons/ButtonPrimaryLarge";
import withDraggable from "@/components/dnd/draggableHOC";
import withDroppable from "@/components/dnd/droppableHOC";
import { StyledBoardWrapper, StyledColumnTasksWrapper, StyledNewColumn, StyledTask } from "./StyledComponents";
import EditBoard from "@/components/UpdateOrCreateNewBoard";
import CreateNewBoard from "@/components/UpdateOrCreateNewBoard";

import { rearrangeOrderAccordingToIndex, sortByKey } from "@/util";

const Board = () => {
  const { boardDetails, editBoard, deleteTask, editTask } = useContext(BoardContext)!;
  const boardColumns = boardDetails.data?.columns;
  const isColumnsEmpty = boardColumns === null || boardColumns === undefined || boardColumns.length === 0;
  const noBoard = !boardDetails.data;
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  // modals
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [isEditTaskDetailsModalOpen, setIsEditTaskDetailsModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isCreateNewBoardModalOpen, setIsCreateNewBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);

  function dragEndEventHandler(result: DropResult) {
    // adjust order of tasks in columns based on where the task is dragged
    const { source, destination } = result;
    if (destination) {
      const taskId = result.draggableId;
      let task: Task;
      // update
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;
      const taskIndexInSourceColumn = source.index;
      const taskIndexInDestinationColumn = destination.index;
      if (sourceColumnId === destinationColumnId && taskIndexInSourceColumn === taskIndexInDestinationColumn) return;
      let tasksInDestinationColumn: Task[] = [];
      // find the task
      boardColumns!.forEach((column) => {
        if (column.id === destinationColumnId) {
          tasksInDestinationColumn = column.tasks || [];
        }
        column.tasks?.forEach((t, i) => {
          if (t.id === taskId) {
            task = t;
            task.columnId = destinationColumnId;
            column.tasks?.splice(i, 1);
          }
        });
      });
      tasksInDestinationColumn.splice(taskIndexInDestinationColumn, 0, task!);
      rearrangeOrderAccordingToIndex(tasksInDestinationColumn);
      editTask(task!);
    }
  }
  return (
    <StyledBoardWrapper $isColumnsAvailable={!isColumnsEmpty}>
      <DragDropContext onDragEnd={dragEndEventHandler}>
        {boardColumns &&
          boardColumns.map((column) => {
            sortByKey(column.tasks || [], (x) => x.order);
            const Column = () => {
              return (
                <div key={column.id}>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <MediumBoldBodyText isPrimary={false}>{`${column.title}  (${
                      column.tasks?.length || 0
                    })`}</MediumBoldBodyText>
                  </div>

                  <StyledColumnTasksWrapper>
                    {column.tasks?.map((task, taskIndex) => {
                      const Task = () => {
                        const totalSubTasks = task.subtasks?.length || 0;
                        const subTasksDone = task.subtasks && task.subtasks.filter((x) => x.isDone).length;
                        return (
                          <StyledTask
                            onClick={() => {
                              setSelectedTask(_.cloneDeep(task));
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
        {/* board with no columns */}
        {isColumnsEmpty && !noBoard && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
              width: "28.6875rem",
              textAlign: "center",
            }}
          >
            <LargeHeading isPrimary={false}>This board is empty. Create a new column to get started.</LargeHeading>
            <div style={{ width: "10.875rem" }}>
              <ButtonPrimaryLarge onClick={() => setIsEditBoardModalOpen(true)}>+ Add New Column</ButtonPrimaryLarge>
            </div>
          </div>
        )}
        {/* no board */}
        {noBoard && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
              width: "28.6875rem",
              textAlign: "center",
            }}
          >
            <LargeHeading isPrimary={false}>Looks Empty. Create a new board to get started.</LargeHeading>
            <div style={{ width: "10.875rem" }}>
              <ButtonPrimaryLarge
                onClick={() => {
                  setIsCreateNewBoardModalOpen(true);
                }}
              >
                + Add New Board
              </ButtonPrimaryLarge>
            </div>
          </div>
        )}
      </DragDropContext>

      {!isColumnsEmpty && <StyledNewColumn onClick={() => setIsEditBoardModalOpen(true)} />}
      {/* modals */}
      <Modal isOpen={isTaskDetailsModalOpen} setIsOpen={setIsTaskDetailsModalOpen}>
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onSubmit={(task) => {
              setSelectedTask(_.cloneDeep(task));
            }}
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
            onSubmit={(task) => {
              setIsEditTaskDetailsModalOpen(false);
              setSelectedTask(_.cloneDeep(task));
            }}
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
              if (id) {
                deleteTask(id);
              }
              setIsDeleteTaskModalOpen(false);
            }}
          />
        )}
      </Modal>
      <Modal isOpen={isCreateNewBoardModalOpen} setIsOpen={setIsCreateNewBoardModalOpen}>
        <CreateNewBoard onSubmit={() => setIsCreateNewBoardModalOpen(false)} />
      </Modal>
      <Modal isOpen={isEditBoardModalOpen} setIsOpen={setIsEditBoardModalOpen}>
        {!noBoard && (
          <EditBoard
            initialValues={boardDetails.data}
            onSubmit={(board) => {
              editBoard(board);
              setIsEditBoardModalOpen(false);
            }}
          />
        )}
      </Modal>
    </StyledBoardWrapper>
  );
};

export default Board;
