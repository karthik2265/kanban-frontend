import { styled } from "styled-components";
import { Theme, ThemeOptions } from "@/types/styles";
import ExtraLargeHeading from "./components/typography/ExtraLargeHeading";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useState } from "react";
import Dropdown, { DropdownOption } from "./components/inputs/Dropdown";

const StyledApp = styled.div<{ theme: Theme }>`
  height: 100vh;
  width: 100vw;
  padding: 5rem;
  background-color: ${(props) => props.theme.primaryBg};
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const StyledDropdownWrapper = styled.div`
  width: 26rem;
`;

function App() {
  const { setCurrentTheme } = useContext(ThemeContext)!;
  const [options, setOptions] = useState([
    { displayText: "To do", id: "q", isSelected: true },
    { displayText: "Done", id: "w", isSelected: false },
  ]);
  const onChnageHandler = (id: string) =>
    setOptions((options) => {
      const updatedOptions: DropdownOption[] = [];
      options.forEach((option) => {
        const updatedOption = { ...option };
        if (option.id === id) updatedOption.isSelected = true;
        else updatedOption.isSelected = false;
        updatedOptions.push(updatedOption);
      });
      return updatedOptions;
    });
  return (
    <StyledApp>
      <div
        onClick={() =>
          setCurrentTheme((prev) => {
            if (prev === ThemeOptions.Dark) return ThemeOptions.Light;
            return ThemeOptions.Dark;
          })
        }
      >
        <ExtraLargeHeading>Toggle Theme</ExtraLargeHeading>
      </div>
      <StyledDropdownWrapper>
        <Dropdown options={options} onChange={onChnageHandler} />
      </StyledDropdownWrapper>
    </StyledApp>
  );
}

export default App;
