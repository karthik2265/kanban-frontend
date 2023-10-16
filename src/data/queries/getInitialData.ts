import { gql } from "@apollo/client";

const GET_INITIAL_DATA = gql`
  query GetInitialData {
    boardsCollection {
      edges {
        node {
          nodeId
          title
        }
      }
    }
  }
`;

export default GET_INITIAL_DATA;
