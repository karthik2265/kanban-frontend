import Logo from "@/components/Logo";
import ExtraLargeHeading from "@/components/typography/ExtraLargeHeading";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { useContext, useState } from "react";
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
// import LargeHeading from "@/components/typography/LargeHeading";
// import supabase from "@/supbaseClient";
import { BoardContext } from "@/context/BoardContext";

const Menu = () => {
  // const [user, setUser] = useState<null | { id: string }>(null);

  // useEffect(() => {
  //   // Set the user immediately if already signed in
  //   supabase.auth.getSession().then(({ data, error }) => {
  //     if (data.session) {
  //       setUser(data.session.user);
  //     }
  //   });

  //   // Subscribe to auth changes
  //   const { data: authSubscription } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === "SIGNED_IN" && session) {
  //       setUser(session.user);
  //     }
  //   });

  //   // Cleanup the subscription on unmount
  //   return () => {
  //     authSubscription.subscription.unsubscribe();
  //   };
  // }, []);
  const { isSecondaryMenuOpen, toggleSecondaryMenuVisibility } = useContext(RootLayoutContext)!;
  const { boardDetails, editBoard, deleteBoard } = useContext(BoardContext)!;
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
          <ExtraLargeHeading>{truncateText(boardDetails.data ? boardDetails.data.title : null, 25)}</ExtraLargeHeading>
          <StyledDownArrowIconWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
            <DownArrowIcon />
          </StyledDownArrowIconWrapper>
        </StyledBoardTitleWrapper>
        <StyledActionsWrapper>
          <div
            onClick={async (event) => {
              event.preventDefault();
              // const { user, data, error } = await supabase.auth.signInWithOAuth({ provider: "github" });
            }}
          >
            {/* <LargeHeading> {user ? `Profile` : "Login with github"}</LargeHeading> */}
          </div>
          <StyledAddNewTaskActionButton
            $isAvailable={!!(boardDetails.data?.columns && boardDetails.data.columns.length > 0)}
            onClick={() => {
              if (boardDetails.data?.columns && boardDetails.data.columns.length > 0) {
                setIsNewTaskModalOpen(true);
              }
            }}
          >
            <div>
              <span>+</span>
              <span> Add New Task</span>
            </div>
          </StyledAddNewTaskActionButton>
          {boardDetails.data && (
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
        {boardDetails.data?.columns && boardDetails.data.columns.length > 0 && (
          <NewTask onSubmit={() => setIsNewTaskModalOpen(false)} />
        )}
      </Modal>
      <Modal isOpen={isEditBoardModalOpen} setIsOpen={setIsEditBoardModalOpen}>
        {boardDetails.data && (
          <EditBoard
            initialValues={boardDetails.data}
            onSubmit={(board) => {
              editBoard(board);
              setIsEditBoardModalOpen(false);
            }}
          />
        )}
      </Modal>
      <Modal isOpen={isDeleteBoardModalOpen} setIsOpen={setIsDeleteBoardModalOpen}>
        {boardDetails.data && (
          <DeleteBoard
            title={boardDetails.data.title}
            id={boardDetails.data.id}
            onSubmit={(id) => {
              if (id) {
                deleteBoard(id);
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
