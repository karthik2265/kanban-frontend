import Layout from "@/layout";
import Board from "@/components/Board";
import { generateTemporaryId } from "./util";
import { BoardDetails } from "./types";

function App() {
  const boardDetails: BoardDetails = {
    columns: [
      {
        id: generateTemporaryId(),
        title: "Todo",
        tasks: [{ id: generateTemporaryId(), title: "Running", subTasksDone: 2, totalSubTasks: 4, order: 1 }],
      },
      {
        id: generateTemporaryId(),
        title: "Doing",
        tasks: [
          { id: generateTemporaryId(), title: "React web app", subTasksDone: 3, totalSubTasks: 12, order: 1 },
          { id: generateTemporaryId(), title: "Supbase backend", subTasksDone: 5, totalSubTasks: 6, order: 2 },
        ],
      },
    ],
  };
  return (
    <Layout>
      <Board details={boardDetails} />
    </Layout>
  );
}

export default App;

