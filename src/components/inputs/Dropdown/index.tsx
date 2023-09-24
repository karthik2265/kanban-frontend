import { useState } from "react";
import { styled } from "styled-components";
import DownArrowIcon from "./DownArrowIcon";

const StyledSelect = styled.div<{ $isActive: boolean }>`
  /* width and height will be set according to where it's being used
   to make this component reusable */
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: ${(props) =>
    props.$isActive ? `1px solid ${props.theme.mainPurple}` : "1px solid rgba(130, 143, 163, 0.25)"};
  background-color: ${(props) => props.theme.primaryBg};
  color: ${(props) => props.theme.primaryText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const StyledOptions = styled.div<{ $isActive: boolean }>`
  width: 100%;
  position: absolute;
  background-color: ${(props) => props.theme.secondaryBg};
  top: calc(100% + 0.5rem);
  left: 0;
  border-radius: 0.25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  display: ${(props) => (props.$isActive ? "flex" : "none")};
`;

const StyledOption = styled.div`
  color: ${(props) => props.theme.secondaryText};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.primaryText};
  }
`;

export type DropdownOption = {
  id: string;
  displayText: string;
  isSelected: boolean;
};

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
  value: string;
  onOptionSelect: (id: string) => void;
};
const Dropdown = ({ options, placeholder = "Please select an option", value, onOptionSelect }: DropdownProps) => {
  const [active, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  return (
    <StyledSelect $isActive={active} onClick={() => setIsActive((prev) => !prev)}>
      {selectedOption ? options.find((x) => x.id === selectedOption)?.displayText : placeholder}
      <StyledOptions $isActive={active}>
        {options.map((option) => {
          return (
            <StyledOption
              key={option.id}
              onClick={() => {
                setSelectedOption(option.id);
                onOptionSelect(option.id);
              }}
            >
              {option.displayText}
            </StyledOption>
          );
        })}
      </StyledOptions>
      <DownArrowIcon />
    </StyledSelect>
  );
};

export default Dropdown;
