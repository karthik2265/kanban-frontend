/* 
   The board menu component size, position and trigger for open and 
   close changes based on position.

   * size and position can be managed by the board component itself and 
   * open and close can be managed by a context
  
 */

import { ReactNode, useContext } from "react";
import SecondaryMenu from "@/layout/SecondaryMenu";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { styled } from "styled-components";
import Menu from "./Menu";

const StyledMenuAndContentWrapper = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  position: fixed;
  height: 100%;
  width: ${(props) => (props.$isSecondaryMenuOpen ? "calc(100vw - 18.75rem)" : "100vw")};
  left: ${(props) => (props.$isSecondaryMenuOpen ? "18.75rem" : "0")}; /* width = secondary menu open */
  transition: left 0.3s ease-in-out;

  @media (max-width: 800px) {
    left: ${(props) => (props.$isSecondaryMenuOpen ? "16.25rem" : "0")};
    width: ${(props) => (props.$isSecondaryMenuOpen ? "calc(100vw - 16.25rem)" : "100vw")};
  }

  @media (max-width: 650px) {
    left: 0;
    width: 100vw;
  }
`;

const StyledContentWrapper = styled.div`
  background-color: ${(props) => props.theme.secondaryBg};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 6rem;
  @media (max-width: 800px) {
    top: 5rem;
  }

  @media (max-width: 650px) {
    top: 4rem;
  }
`;

const StyledLayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.primaryBg};
  display: flex;
`;

const StyledSecondaryMenuBackground = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  @media (max-width: 650px) {
    background-color: ${(props) => props.theme.black};
    opacity: 0.5;
    position: fixed;
    top: 4rem;
    height: calc(100vh - 4rem);
    width: 100vw;
    display: ${(props) => (props.$isSecondaryMenuOpen ? "block" : "none")};
  }
`;

const Layout = ({ children }: { children: ReactNode }) => {
  const { isSecondaryMenuOpen, toggleSecondaryMenuVisibility } = useContext(RootLayoutContext)!;

  return (
    <StyledLayoutWrapper>
      <SecondaryMenu />
      <StyledMenuAndContentWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
        <Menu />
        <StyledContentWrapper>{children}</StyledContentWrapper>
      </StyledMenuAndContentWrapper>
      <StyledSecondaryMenuBackground
        onClick={toggleSecondaryMenuVisibility}
        $isSecondaryMenuOpen={isSecondaryMenuOpen}
      />
    </StyledLayoutWrapper>
  );
};

export default Layout;
