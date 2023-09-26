import styled from "styled-components";
import LargeHeading from "@/components/typography/LargeHeading";
import MediumBodyText from "../typography/MediumBodyText";
import ButtonDestructive from "../buttons/ButtonDestructive";
import ButtonSecondary from "../buttons/ButtonSecondary";

const StyledWrapper = styled.div`
  width: 30rem;
  flex-shrink: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.primaryBg};

  @media (max-width: 650px) {
    width: 21.4375rem;
  }
`;

const StyledActionsWrapper = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 0.65rem;
  }
`;

const DeleteTask = ({ title, id, onSubmit }: { title: string; id: string; onSubmit: (id: string | null) => void }) => {
  return (
    <StyledWrapper>
      <LargeHeading>Delete this task?</LargeHeading>
      <MediumBodyText isPrimary={false}>
        {`Are you sure you want to delete the ‘${title}’ task and its subtasks? This action cannot be reversed.`}
      </MediumBodyText>
      <StyledActionsWrapper>
        <ButtonDestructive onClick={() => onSubmit(id)}>Delete</ButtonDestructive>
        <ButtonSecondary onClick={() => onSubmit(null)}>Cancel</ButtonSecondary>
      </StyledActionsWrapper>
    </StyledWrapper>
  );
};

export default DeleteTask;
