import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

const StyledModalBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.black + "80"};
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  z-index: 9;
`;

const StyledModalContentWrapper = styled.div<{ $isOpen: boolean }>`
  scale: ${(props) => (props.$isOpen ? "1" : "0.3")};
  transition: scale 0.3s ease-in-out;
`;

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  return createPortal(
    <StyledModalBackground $isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <StyledModalContentWrapper onClick={(e) => e.stopPropagation()} $isOpen={isOpen}>
        {children}
      </StyledModalContentWrapper>
    </StyledModalBackground>,
    document.getElementById("root")!
  );
};

export default Modal;

// DEBUG
// * see why some styles are not rendered properly when modal is open
