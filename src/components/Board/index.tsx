import { BoardDetails } from "@/types";
import { StyledBoardWrapper, StyledColumnTasksWrapper, StyledNewColumn, StyledTask } from "./StyledComponents";
import MediumHeading from "../typography/MediumHeading";
import MediumBoldBodyText from "../typography/MediumBoldBodyText";

const Board = ({ details }: { details: BoardDetails }) => {
  const { columns } = details;
  return (
    <StyledBoardWrapper>
      {columns.map((column) => {
        return (
          <div key={column.id}>
            <div style={{ marginBottom: "1.25rem" }}>
              <MediumBoldBodyText isPrimary={false}>{`${column.title}  (${column.tasks.length})`}</MediumBoldBodyText>
            </div>
            <StyledColumnTasksWrapper>
              {column.tasks.map((task) => {
                return (
                  <StyledTask key={task.id}>
                    <MediumHeading>{task.title}</MediumHeading>
                    <MediumBoldBodyText isPrimary={false}>
                      {task.totalSubTasks > 0 ? `${task.subTasksDone} of ${task.totalSubTasks} subtasks` : null}
                    </MediumBoldBodyText>
                  </StyledTask>
                );
              })}
            </StyledColumnTasksWrapper>
          </div>
        );
      })}
      <StyledNewColumn />
    </StyledBoardWrapper>
  );
};

export default Board;
