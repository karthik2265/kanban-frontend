import React, { useContext, useState } from "react";
import { Board, BoardColumn } from "@/types";
import styled from "styled-components";
import { generateTemporaryId } from "@/util";
// components
import LargeHeading from "@/components/typography/LargeHeading";
import MediumBoldBodyText from "@/components/typography/MediumBoldBodyText";
import TextField from "@/components/inputs/TextField";
import ButtonPrimaryLarge from "@/components/buttons/ButtonPrimaryLarge";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import CrossIcon from "@/components/icons/Cross";
import { BoardContext } from "@/context/BoardContext";

const StyledWrapper = styled.div`
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

type UpdateOrCreateNewBoardProps = {
  onSubmit: (board: Board & { columns: BoardColumn[] | null }) => void;
  initialValues?: Omit<Board & { columns: BoardColumn[] | null }, "order"> | null;
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
const UpdateOrCreateNewBoard = ({ initialValues = null, onSubmit }: UpdateOrCreateNewBoardProps) => {
  const isCreateMode = initialValues === null;
  const [title, setTitle] = useState(isCreateMode ? "" : initialValues.title);
  const [columns, setColumns] = useState<BoardColumn[]>(() => {
    if (isCreateMode || !initialValues.columns) return defaultColumns;
    return initialValues.columns;
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { addBoard, boards } = useContext(BoardContext)!;
  return (
    <StyledWrapper>
      <LargeHeading>{isCreateMode ? "Add New Board" : "Edit Board"}</LargeHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <MediumBoldBodyText>Board Name</MediumBoldBodyText>
        <div style={{ height: "2.5rem" }}>
          <TextField
            placeholder="e.g. Web Design"
            onChange={(x) => setTitle(x)}
            showErrorMessage={isFormSubmitted && !title}
            errorMessage="Can't be empty"
            value={title}
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
                    value={column.title}
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
                  const id = initialValues?.id || generateTemporaryId();
                  if (isCreateMode) {
                    addBoard({ title, id, columns });
                    // reset form to initial state
                    setTitle("");
                    setColumns(defaultColumns);
                    setIsFormSubmitted(false);
                  }
                  onSubmit({ id, title, columns, order: boards.data?.length || 1 });
                }
              }}
            >
              {isCreateMode ? "Create New Board" : "Save Changes"}
            </ButtonPrimaryLarge>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default UpdateOrCreateNewBoard;

// DEBUG
// * check why height prop needs to be passed to ButtonPrimaryLarge
