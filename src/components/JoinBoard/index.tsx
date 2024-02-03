import styled from "styled-components";
import LargeHeading from "@/components/typography/LargeHeading";
import MediumBodyText from "@/components/typography/MediumBodyText";
import ButtonPrimarySmall from "../buttons/ButtonPrimarySmall";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardContext";
import { UserContext } from "@/context/UserContext";
import TextField from "../inputs/TextField";
import { useState } from "react";

const StyledWrapper = styled.div`
  width: 30rem;
  flex-shrink: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.primaryBg};
  text-align: center;

  @media (max-width: 650px) {
    width: 21.4375rem;
  }
`;

const JoinBoard = () => {
  const { joinBoard } = useContext(BoardContext)!;
  const { user } = useContext(UserContext)!;
  const [boardId, setBoardId] = useState("");
  return (
    <StyledWrapper>
      <LargeHeading>Join Board</LargeHeading>
      <MediumBodyText isPrimary={false}>
        {`you can join a board by pasting the code provided by the team member`}
      </MediumBodyText>
      <TextField
        placeholder="paste the code here"
        value={boardId}
        onChange={(x) => setBoardId(x)}
        showErrorMessage={boardId.trim() == ""}
        errorMessage="can't be empty"
      />
      <ButtonPrimarySmall
        onClick={() => {
          joinBoard({ userId: user!.id, boardId });
        }}
      >
        Join
      </ButtonPrimarySmall>
    </StyledWrapper>
  );
};

export default JoinBoard;
