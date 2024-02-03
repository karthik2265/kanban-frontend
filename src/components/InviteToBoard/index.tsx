import { styled } from "styled-components";
import LargeHeading from "@/components/typography/LargeHeading";
import MediumBodyText from "@/components/typography/MediumBodyText";
import ButtonPrimarySmall from "../buttons/ButtonPrimarySmall";
import { useState, useEffect } from "react";

const StyledWrapper = styled.div`
  width: 30rem;
  flex-shrink: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.primaryBg};
  text-align: center;

  @media (max-width: 650px) {
    width: 21.4375rem;
  }
`;

const InviteToBoard = ({ id }: { id: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    setIsCopied(false);
  }, []);
  return (
    <StyledWrapper>
      <LargeHeading>Invite to board</LargeHeading>
      <MediumBodyText isPrimary={false}>
        {`you can invite your team members to the board by using the code below, once you have sent this code to a member ask them to go to the app and click on join board in the menu and paste the code given`}
      </MediumBodyText>
      <MediumBodyText isPrimary={true}>{id}</MediumBodyText>
      <ButtonPrimarySmall
        onClick={() => {
          navigator.clipboard.writeText(id);
          setIsCopied(true);
        }}
      >
        {isCopied ? "Copied to clipboard" : "Copy"}
      </ButtonPrimarySmall>
    </StyledWrapper>
  );
};

export default InviteToBoard;
