import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../User";
import Router from "next/router";
const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <button
        onClick={() => {
          signout();
          Router.push({
            pathname: "/"
          });
        }}
      >
        Sign Out
      </button>
    )}
  </Mutation>
);

export default Signout;
