import { styled } from "styled-components";
import CheckBox from "./CheckBoxIcon";

const StyledLabel = styled.label<{ $isChecked: boolean }>`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 1rem;
  border-radius: 0.25rem;
  width: 21.875rem;
  color: ${(props) => props.theme.primaryText + (props.$isChecked ? "80" : "")};
  background-color: ${(props) => props.theme.secondaryBg};
  text-decoration: ${(props) => (props.$isChecked ? "line-through" : "none")};
  /* alignment */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: ${(props) =>
      props.theme.isLightTheme ? props.theme.mainPurpleHover + "40" : props.theme.mainPurple + "40"};
    cursor: pointer;
  }
`;

type ReadonlySubTaskProps = {
  text: string;
  isChecked: boolean;
  id: string;
  onToggle: (id: string) => void;
};
const ReadonlySubTask = ({ text, isChecked, onToggle, id }: ReadonlySubTaskProps) => {
  return (
    <StyledLabel onClick={() => onToggle(id)} key={id} $isChecked={isChecked}>
      <CheckBox isChecked={isChecked} />
      {text}
    </StyledLabel>
  );
};

export default ReadonlySubTask;
