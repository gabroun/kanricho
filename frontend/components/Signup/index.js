import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import StyledForm from "./_signup";
import { CURRENT_USER_QUERY } from "../User";
import Router from "next/router";

const SIGNUP_MUTATION = gql`
  mutation SINGUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      name
      id
      email
    }
  }
`;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
    this.saveToState = this.saveToState.bind(this);
  }
  saveToState(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <StyledForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await signup();

                this.setState({ name: "", email: "", password: "" });
                Router.push({
                  pathname: "/dashboard"
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up</h2>
                <Error error={error} />
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Sign up</button>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
