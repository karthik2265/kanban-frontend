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
`;
const DeleteBoard = ({ title, id, onSubmit }: { title: string; id: string; onSubmit: (id: string | null) => void }) => {
  return (
    <StyledWrapper>
      <LargeHeading>Delete this board?</LargeHeading>
      <MediumBodyText isPrimary={false}>
        {`Are you sure you want to delete the ‘${title}’ board? This action will remove all columns and tasks and cannot be reversed.`}
      </MediumBodyText>
      <div style={{ display: "flex", gap: "1rem" }}>
        <ButtonDestructive onClick={() => onSubmit(id)}>Delete</ButtonDestructive>
        <ButtonSecondary onClick={() => onSubmit(null)}>Cancel</ButtonSecondary>
      </div>
    </StyledWrapper>
  );
};

export default DeleteBoard;
