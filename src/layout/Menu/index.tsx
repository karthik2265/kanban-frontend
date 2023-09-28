import Logo from "@/components/Logo";
import ExtraLargeHeading from "@/components/typography/ExtraLargeHeading";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { Board } from "@/types";
import { useContext, useEffect, useState } from "react";
import {
  StyledMenuWrapper,
  StyledLogoWrapper,
  StyledMenuContentWrapper,
  StyledAddNewTaskActionButton,
  StyledActionsWrapper,
  StyledBoardTitleWrapper,
  StyledDownArrowIconWrapper,
} from "./StyledComponents";
import DownArrowIcon from "@/components/icons/DownArrow";
import { truncateText } from "@/util";
import Modal from "@/components/Modal";
import NewTask from "@/components/UpdateOrCreateNewTask";
import EditBoard from "@/components/UpdateOrCreateNewBoard";
import DeleteBoard from "@/components/DeleteBoard";
import MoreOptions from "@/components/MoreOptions";
import LargeHeading from "@/components/typography/LargeHeading";
import supabase from "@/supbaseClient";

type MenuProps = {
  board: Omit<Board, "order"> | null;
};

const Menu = ({ board }: MenuProps) => {
  const [user, setUser] = useState<null | { id: string }>(null);

  useEffect(() => {
    // Set the user immediately if already signed in
    supabase.auth.getSession().then(({ data, error }) => {
      console.log(data, error);
      if (data.session) {
        setUser(data.session.user);
      }
    });

    // Subscribe to auth changes
    const { data: authSubscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user);
      }
    });

    // Cleanup the subscription on unmount
    return () => {
      authSubscription.subscription.unsubscribe();
    };
  }, []);
  const { isSecondaryMenuOpen, toggleSecondaryMenuVisibility } = useContext(RootLayoutContext)!;
  // modals
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);
  return (
    <StyledMenuWrapper>
      <StyledLogoWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
        <Logo />
      </StyledLogoWrapper>
      <StyledMenuContentWrapper>
        <StyledBoardTitleWrapper
          onClick={() => {
            if (window.matchMedia("(max-width: 650px)").matches) {
              toggleSecondaryMenuVisibility();
            }
          }}
        >
          <ExtraLargeHeading>{truncateText(board ? board.title : null, 25)}</ExtraLargeHeading>
          <StyledDownArrowIconWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
            <DownArrowIcon />
          </StyledDownArrowIconWrapper>
        </StyledBoardTitleWrapper>
        <StyledActionsWrapper>
          <div
            onClick={async (event) => {
              event.preventDefault();
              const { user, data, error } = await supabase.auth.signInWithOAuth({ provider: "github" });
              console.log("error", error, data, user);
            }}
          >
            <LargeHeading> {user ? `Profile` : "Login with github"}</LargeHeading>
          </div>
          <StyledAddNewTaskActionButton
            $isAvailable={!!(board && board.columns)}
            onClick={() => {
              if (board && board.columns) {
                setIsNewTaskModalOpen(true);
              }
            }}
          >
            <div>
              <span>+</span>
              <span> Add New Task</span>
            </div>
          </StyledAddNewTaskActionButton>
          {board && (
            <MoreOptions
              options={[
                { text: "Edit", isDangerOption: false, onClick: () => setIsEditBoardModalOpen(true) },
                { text: "Delete", isDangerOption: true, onClick: () => setIsDeleteBoardModalOpen(true) },
              ]}
            />
          )}
        </StyledActionsWrapper>
      </StyledMenuContentWrapper>
      {/* modals */}
      <Modal isOpen={isNewTaskModalOpen} setIsOpen={setIsNewTaskModalOpen}>
        {board && board.columns && (
          <NewTask
            boardColumns={board!.columns!}
            onSubmit={(newtask) => {
              setIsNewTaskModalOpen(false);
              // TODO
              // handle the data using data manager and show a notification
            }}
          />
        )}
      </Modal>
      <Modal isOpen={isEditBoardModalOpen} setIsOpen={setIsEditBoardModalOpen}>
        {board && (
          <EditBoard
            initialValues={board}
            onSubmit={(updatedBoard) => {
              // TODO
              // update bord data using data manager
              setIsEditBoardModalOpen(false);
            }}
          />
        )}
      </Modal>
      <Modal isOpen={isDeleteBoardModalOpen} setIsOpen={setIsDeleteBoardModalOpen}>
        {board && (
          <DeleteBoard
            title={board.title}
            id={board.id}
            onSubmit={(id) => {
              if (id) {
                // TODO
                // delete board and show a notification
              }
              setIsDeleteBoardModalOpen(false);
            }}
          />
        )}
      </Modal>
    </StyledMenuWrapper>
  );
};

export default Menu;
