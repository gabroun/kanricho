import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";

import styled, { keyframes } from "styled-components";
import { CURRENT_USER_QUERY } from "../User";
const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }
  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const StyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1rem;
  line-height: 1;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SINGIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      name
      id
      email
    }
  }
`;

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.saveToState = this.saveToState.bind(this);
  }
  saveToState(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <StyledForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await signin();

                this.setState({ name: "", email: "", password: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In</h2>
                <Error error={error} />
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
                <button type="submit">Sign in</button>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
