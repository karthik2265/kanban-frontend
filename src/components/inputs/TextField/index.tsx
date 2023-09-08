import { useState } from "react";
import { styled } from "styled-components";

const StyledInput = styled.input<{ $error: boolean; $errorMessage: string }>`
  width: 100%;
  padding: 0.75rem;
  color: ${(props) => props.theme.primaryText};
  outline: none;
  border: none;
  background-color: ${(props) => props.theme.primaryBg};
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;
`;

// need a wrapper because ::after psuedo elements do not work well with input element
const StyledInputWrapper = styled.div<{ $error: boolean; $errorMessage: string }>`
  /* width and height will be set according to where it's being used
   to make this component reusable */
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  border: 1px solid rgba(130, 143, 163, 0.25);
  position: relative;
  font-size: 0.8125rem;

  &:after {
    /* content: ${(props) => props.$errorMessage}; */
    content: "Can't be empty";
    color: ${(props) => props.theme.red};
    position: absolute;
    right: 1rem;
    top: 1rem;
    display: ${(props) => (props.$error ? "block" : "none")};
  }
`;

type TextFieldProps = {
  placeholder: string;
  onChange: (x: string) => void;
  showErrorMessage: boolean;
  errorMessage: string;
  initialValue?: string | undefined;
};
const TextField = ({
  placeholder,
  onChange,
  showErrorMessage,
  errorMessage,
  initialValue = undefined,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  console.log(showErrorMessage);
  return (
    <StyledInputWrapper $error={!isFocused && showErrorMessage} $errorMessage={errorMessage}>
      <StyledInput
        value={initialValue}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        $error={showErrorMessage && !isFocused}
        $errorMessage={errorMessage}
      />
    </StyledInputWrapper>
  );
};

export default TextField;
