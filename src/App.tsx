import { styled } from "styled-components";
import { Theme, ThemeOptions } from "@/types/styles";
import ExtraLargeHeading from "./components/typography/ExtraLargeHeading";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Layout from "@/Layout";

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
      <Layout />
    </StyledApp>
  );
}

export default App;
