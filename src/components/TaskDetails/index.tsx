import { styled } from "styled-components";
import LargeHeading from "@/components/typography/LargeHeading";
import { useState } from "react";
import { BoardColumn, SubTask } from "@/types";
import MediumBoldBodyText from "../typography/MediumBoldBodyText";
import ReadonlySubTask from "../inputs/ReadonlySubTask";
import Dropdown from "@/components/inputs/Dropdown";
import MediumBodyText from "@/components/typography/MediumBodyText";
import _ from "lodash";
import MoreOptions from "@/components/MoreOptions";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  width: 24.1875rem;
  max-height: 32.6875rem;
  overflow: scroll;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.primaryBg};
  border-radius: 0.375rem;

  @media (max-width: 650px) {
    width: 21.4375rem;
    max-height: 34.8125rem;
    padding: 1.25rem;
  }
`;

const TaskDetails = ({
  title,
  description,
  subtasks_,
  status_,
  userActions,
  boardColumns,
}: {
  id: string;
  title: string;
  description: string | null;
  subtasks_: SubTask[];
  status_: string;
  userActions: { title: string; onClick: () => void; isDangerAction: boolean }[];
  boardColumns: BoardColumn[];
}) => {
  const [subtasks, setSubtasks] = useState(subtasks_);
  const [status, setStatus] = useState(status_);
  return (
    <StyledWrapper>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1.25rem", alignItems: "center" }}>
        <LargeHeading>{title}</LargeHeading>
        <MoreOptions
          options={userActions.map((action) => ({
            text: action.title,
            isDangerOption: action.isDangerAction,
            onClick: () => action.onClick(),
          }))}
        />
      </div>
      <div>
        <MediumBodyText isPrimary={false}>{description}</MediumBodyText>
      </div>
      {subtasks && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MediumBoldBodyText isPrimary={false}>
            {`Subtasks (${subtasks.filter((x) => x.isDone).length} of ${subtasks.length})`}
          </MediumBoldBodyText>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {subtasks.map((subtask) => {
              return (
                <div key={subtask.id}>
                  <ReadonlySubTask
                    text={subtask.value}
                    id={subtask.id}
                    isChecked={subtask.isDone}
                    onToggle={(x) => {
                      setSubtasks((prev) => {
                        const updated = _.cloneDeep(prev);
                        const subtask = updated.find((e) => e.id === x)!;
                        subtask.isDone = !subtask.isDone;
                        return updated;
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <MediumBoldBodyText isPrimary={false}>Current Status</MediumBoldBodyText>
        <Dropdown
          options={boardColumns.map((c) => {
            return { id: c.id, displayText: c.title };
          })}
          value={status}
          onOptionSelect={(x) => {
            setStatus(x);
          }}
        />
      </div>
    </StyledWrapper>
  );
};

export default TaskDetails;
