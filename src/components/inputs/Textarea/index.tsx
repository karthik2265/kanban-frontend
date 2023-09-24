import { useState } from "react";
import { styled } from "styled-components";

const StyledTextarea = styled.textarea<{ $error: boolean; $errorMessage: string }>`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.primaryText};
  background-color: ${(props) => props.theme.primaryBg};
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgba(130, 143, 163, 0.25);
`;

// need a wrapper because ::after psuedo elements do not work well with input element
const StyledTextareaWrapper = styled.div<{ $error: boolean; $errorMessage: string }>`
  /* width and height will be set according to where it's being used
   to make this component reusable */
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 0.8125rem;

  &:after {
    content: ${(props) => `"${props.$errorMessage}"`};
    color: ${(props) => props.theme.red};
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: ${(props) => (props.$error ? "block" : "none")};
  }
`;

type TextareaProps = {
  placeholder: string;
  onChange: (x: string) => void;
  showErrorMessage: boolean;
  errorMessage?: string;
  value: string;
};
const Textarea = ({ placeholder, onChange, showErrorMessage, errorMessage = "", value = "" }: TextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <StyledTextareaWrapper $error={!isFocused && showErrorMessage} $errorMessage={errorMessage}>
      <StyledTextarea
        value={value}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        $error={showErrorMessage && !isFocused}
        $errorMessage={errorMessage}
      />
    </StyledTextareaWrapper>
  );
};

export default Textarea;
