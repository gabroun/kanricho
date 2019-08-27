import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../User";
import Signin from "../Signin";
import Loading from "../Loading";

const SignedIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <Loading />;
      if (!data.me) {
        return (
          <div>
            <p>Please Sign in before continuing</p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default SignedIn;
