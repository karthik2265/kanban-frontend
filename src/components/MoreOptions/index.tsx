import { styled } from "styled-components";
import MoreOptionsIcon from "@/components/icons/MoreOptions";
import { useState } from "react";

const StyledMoreOptionsIconWrapper = styled.div`
  color: ${(props) => props.theme.secondaryText};
  position: relative;
  height: 100%;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.mainPurple};
  }
`;

const StyledOptionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: absolute;
  right: 0;
  top: calc(100% + 1.25rem);
  background-color: ${(props) => props.theme.secondaryBg};
  width: 12rem;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
`;

const StyledOption = styled.div<{ $isDangerOption: boolean }>`
  width: 10rem;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;
  color: ${(props) => (props.$isDangerOption ? props.theme.red : props.theme.secondaryText)};

  &:hover {
    cursor: pointer;
  }
  &:hover {
    color: ${(props) => (props.$isDangerOption ? props.theme.redHover : props.theme.primaryText)};
  }
`;

const MoreOptions = ({ options }: { options: { text: string; isDangerOption: boolean; onClick: () => void }[] }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <StyledMoreOptionsIconWrapper onClick={() => setIsOptionsOpen((prev) => !prev)}>
      <MoreOptionsIcon />
      {isOptionsOpen && (
        <StyledOptionsWrapper>
          {options.map((option) => {
            return (
              <StyledOption
                key={option.text}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsOptionsOpen(false);
                  option.onClick();
                }}
                $isDangerOption={option.isDangerOption}
              >
                {option.text}
              </StyledOption>
            );
          })}
        </StyledOptionsWrapper>
      )}
    </StyledMoreOptionsIconWrapper>
  );
};

export default MoreOptions;
