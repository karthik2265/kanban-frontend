import React, { useState } from "react";
import { BoardColumn } from "@/types";
import styled from "styled-components";
import { generateTemporaryId } from "@/util";
// components
import LargeHeading from "@/components/typography/LargeHeading";
import MediumBoldBodyText from "@/components/typography/MediumBoldBodyText";
import TextField from "@/components/inputs/TextField";
import ButtonPrimaryLarge from "@/components/buttons/ButtonPrimaryLarge";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import CrossIcon from "@/components/icons/Cross";

const StyledCreateNewBoardWrapper = styled.div`
  border-radius: 0.375rem;
  width: 30rem;
  max-height: 26.8125rem;
  overflow: scroll;
  background-color: ${(props) => props.theme.primaryBg};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 650px) {
    width: 21.4375rem;
    height: 25.8125rem;
  }
`;

const StyledCrossIonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }

  &:active {
    scale: 0.97;
  }
`;

interface BoardData {
  title: string;
  columns: BoardColumn[];
}

type UpdateOrCreateNewBoardProps = {
  onSubmit: (board: BoardData) => void;
  initialValues?: BoardData | null;
};

const defaultColumns = [
  { title: "Todo", order: 1, id: generateTemporaryId() },
  { title: "Doing", order: 2, id: generateTemporaryId() },
];

function isDataValid({ title, columns }: { title: string; columns: BoardColumn[] }) {
  if (!title) return false;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (!column.title) return false;
  }
  return true;
}

/*
 some text and initial state of inputs depends on whether this 
 component is used in create mode or update mode 
*/
const UpdateOrCreateNewBoard = ({ onSubmit, initialValues = null }: UpdateOrCreateNewBoardProps) => {
  const isCreateMode = initialValues === null;
  const [title, setTitle] = useState(isCreateMode ? "" : initialValues.title);
  const [columns, setColumns] = useState<BoardColumn[]>(isCreateMode ? defaultColumns : initialValues.columns);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  return (
    <StyledCreateNewBoardWrapper>
      <LargeHeading>{isCreateMode ? "Add New Board" : "Edit Board"}</LargeHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <MediumBoldBodyText>Board Name</MediumBoldBodyText>
        <div style={{ height: "2.5rem" }}>
          <TextField
            placeholder="e.g. Web Design"
            onChange={(x) => setTitle(x)}
            showErrorMessage={isFormSubmitted && !title}
            errorMessage="Can't be empty"
            initialValue={title}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <MediumBoldBodyText>Board Columns</MediumBoldBodyText>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {columns.map((column) => {
            return (
              <div key={column.id} style={{ height: "2.5rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    initialValue={column.title}
                    placeholder="e.g. Todo"
                    onChange={(newTitle) => {
                      setColumns((prev) => {
                        const updatedColumns: BoardColumn[] = [];
                        const updatedColumnIndex = columns.findIndex((x) => x.id === column.id);

                        prev.forEach((column, i) => {
                          const updatedColumn = { ...column };
                          if (i === updatedColumnIndex) {
                            updatedColumn.title = newTitle;
                          }
                          updatedColumns.push(updatedColumn);
                        });
                        return updatedColumns;
                      });
                    }}
                    showErrorMessage={isFormSubmitted && !column.title}
                    errorMessage="Can't be empty"
                  />
                </div>
                <StyledCrossIonWrapper
                  onClick={() => setColumns((columns) => columns.filter((x) => x.id !== column.id))}
                >
                  <CrossIcon />
                </StyledCrossIonWrapper>
              </div>
            );
          })}
          <ButtonSecondary
            onClick={() => {
              setColumns((prev) => {
                const newColumn = { title: "", order: prev.length + 1, id: generateTemporaryId() };
                const newColumns = [...prev, newColumn];
                return newColumns;
              });
            }}
          >
            + Add New Column
          </ButtonSecondary>
          <div style={{ marginTop: "1.15rem" }}>
            <ButtonPrimaryLarge
              height="2.5rem"
              onClick={() => {
                setIsFormSubmitted(true);
                if (isDataValid({ title, columns })) {
                  onSubmit({ title, columns });
                } else {
                  // TODO show notification form is not valid
                }
              }}
            >
              {isCreateMode ? "Create New Board" : "Save Chnages"}
            </ButtonPrimaryLarge>
          </div>
        </div>
      </div>
    </StyledCreateNewBoardWrapper>
  );
};

export default UpdateOrCreateNewBoard;

// DEBUG
// * check why height prop needs to be passed to ButtonPrimaryLarge
