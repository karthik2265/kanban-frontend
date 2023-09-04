import ButtonPrimaryLarge from "@/components/buttons/ButtonPrimaryLarge";
import { styled } from "styled-components";
import { Theme, ThemeOptions } from "@/types/styles";
import ButtonPrimarySmall from "./components/buttons/ButtonPrimarySmall";
import ExtraLargeHeading from "./components/typography/ExtraLargeHeading";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import ButtonSecondary from "./components/buttons/ButtonSecondary";
import ButtonDestructive from "./components/buttons/ButtonDestructive";

const StyledApp = styled.div<{ theme: Theme }>`
  height: 100vh;
  width: 100vw;
  padding: 5rem;
  background-color: ${(props) => props.theme.secondaryBg};
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { setCurrentTheme } = useContext(ThemeContext)!;
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
      <ButtonPrimaryLarge>Button Primary (L)</ButtonPrimaryLarge>
      <ButtonPrimarySmall>Button Primary (S)</ButtonPrimarySmall>
      <ButtonSecondary>Button Secondary</ButtonSecondary>
      <ButtonDestructive>Button Destructive</ButtonDestructive>
    </StyledApp>
  );
}

export default App;
