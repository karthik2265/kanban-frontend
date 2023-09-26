import { styled } from "styled-components";
import { generateTemporaryId } from "@/util";
import { useState } from "react";
// components
import LargeHeading from "@/components/typography/LargeHeading";
import MediumBoldBodyText from "@/components/typography/MediumBoldBodyText";
import TextField from "@/components/inputs/TextField";
import CrossIcon from "@/components/icons/Cross";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { BoardColumn, SubTask } from "@/types";
import Dropdown from "@/components/inputs/Dropdown";
import ButtonPrimarySmall from "@/components/buttons/ButtonPrimarySmall";
import Textarea from "@/components/inputs/Textarea";

import _ from "lodash";

const StyledWrapper = styled.div`
  width: 30rem;
  max-height: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-shrink: 0;
  overflow: scroll;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.primaryBg};
  padding: 2rem;

  @media (max-width: 650px) {
    width: 21.4375rem;
    height: 41.1875rem;
    padding: 1rem;
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledCrossIonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }

  &:active {
    scale: 0.97;
  }
`;

const UpdateOrCreateNewTask = ({
  boardColumns,
  initialValues = null,
  onSubmit,
}: {
  boardColumns: BoardColumn[];
  initialValues?: null | { title: string; description: string | null; subtasks: SubTask[]; status: string };
  onSubmit: (data: {
    title: string;
    id: string;
    description: string | null;
    subtasks: Omit<SubTask, "isDone">[];
    columnId: string;
  }) => void;
}) => {
  const isCreateMode = initialValues === null;
  console.log(initialValues, "EditTask");
  const [title, setTitle] = useState(isCreateMode ? "" : initialValues.title);
  const [description, setDescription] = useState(isCreateMode ? null : initialValues.description);
  const [subtasks, setSubtasks] = useState(
    isCreateMode ? [{ id: generateTemporaryId(), value: "", order: 1 }] : initialValues.subtasks
  );
  const [status, setStatus] = useState(isCreateMode ? boardColumns[0].id : initialValues.status);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function resetFormToInitialState() {
    setTitle("");
    setDescription("");
    setSubtasks([{ id: generateTemporaryId(), value: "", order: 1 }]);
    setStatus(boardColumns[0].id);
    setIsFormSubmitted(false);
  }
  return (
    <StyledWrapper>
      <LargeHeading>{isCreateMode ? "Add New Task" : "Edit Task"}</LargeHeading>
      <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <StyledInputWrapper>
          <MediumBoldBodyText>Title</MediumBoldBodyText>
          <TextField
            showErrorMessage={isFormSubmitted && title.trim() === ""}
            errorMessage="Can't be empty"
            value={title}
            onChange={(x) => setTitle(x)}
            placeholder="Take coffe break"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <MediumBoldBodyText>Description</MediumBoldBodyText>
          <div style={{ height: "7rem" }}>
            <Textarea
              showErrorMessage={false}
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              value={description}
              onChange={(x) => setDescription(x)}
            />
          </div>
        </StyledInputWrapper>
        <StyledInputWrapper>
          <MediumBoldBodyText>Subtasks</MediumBoldBodyText>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {subtasks.map((subtask) => {
              return (
                <div key={subtask.id} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <TextField
                    placeholder="e.g Make coffe"
                    showErrorMessage={isFormSubmitted && subtask.value === ""}
                    errorMessage="Can't be empty"
                    value={subtask.value}
                    onChange={(x) => {
                      setSubtasks((prev) => {
                        const newState = _.cloneDeep(prev);
                        prev.forEach((e) => {
                          if (e.id === subtask.id) {
                            e.value = x.trim();
                          }
                        });
                        return newState;
                      });
                    }}
                  />
                  <StyledCrossIonWrapper
                    onClick={() => {
                      setSubtasks((prev) => {
                        const updated = _.cloneDeep(prev);
                        return updated.filter((x) => x.id !== subtask.id);
                      });
                    }}
                  >
                    <CrossIcon />
                  </StyledCrossIonWrapper>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <ButtonSecondary
              onClick={() => {
                setSubtasks((prev) => {
                  const updated = _.cloneDeep(prev);
                  updated.push({ id: generateTemporaryId(), order: updated.length + 1, value: "", isDone: false });
                  return updated;
                });
              }}
            >
              + Add New Subtask
            </ButtonSecondary>
          </div>
        </StyledInputWrapper>
        <StyledInputWrapper>
          <MediumBoldBodyText>Status</MediumBoldBodyText>
          <Dropdown
            onOptionSelect={(id) => {
              setStatus(id);
            }}
            value={status}
            options={boardColumns.map((bc) => ({ id: bc.id, displayText: bc.title, isSelected: status === bc.id }))}
          />
        </StyledInputWrapper>
        <div style={{ marginTop: "0.5rem" }}>
          <ButtonPrimarySmall
            onClick={() => {
              setIsFormSubmitted(true);
              const data = { title, description, subtasks, status };
              if (isFormDataValid(data)) {
                onSubmit({
                  id: generateTemporaryId(),
                  title: data.title,
                  description: data.title,
                  subtasks: data.subtasks,
                  columnId: data.status,
                });
                if (isCreateMode) {
                  resetFormToInitialState();
                }
              }
            }}
          >
            {isCreateMode ? "Create Task" : "Save Changes"}
          </ButtonPrimarySmall>
        </div>
      </form>
    </StyledWrapper>
  );
};

function isFormDataValid({
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  description,
  subtasks,
  status,
}: {
  title: string;
  description: string | null;
  subtasks: Omit<SubTask, "isDone">[];
  status: string;
}) {
  if (!title || !status) return false;
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (subtask.value === "") return false;
  }
  return true;
}

export default UpdateOrCreateNewTask;
