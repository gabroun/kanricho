import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { CURRENT_USER_QUERY } from "../User";
import Router from "next/router";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

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
  padding: 20px;
  line-height: 1;
  font-weight: 400;
  font-size: 15px;

  background: rgba(255, 255, 255, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 25px 0px;
  color: #073b4c;
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
    border: 1px solid #c3c3c3;
    margin-top: 8px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: #118ab2;
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
        #ef476f 0%,
        #118ab2 50%,
        #ef476f 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }

  a {
    color: #073b4c;
  }
`;

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: ""
    };
    this.saveToState = this.saveToState.bind(this);
  }
  saveToState(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => {
          return (
            <StyledForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await reset();

                this.setState({ password: "", confirmPassword: "" });
                Router.push({
                  pathname: "/dashboard"
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password</h2>
                <Error error={error} />
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  Confirm your password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Reset Password</button>
                <Link href="/">
                  <a>
                    <span className="header__title">Back</span>
                  </a>
                </Link>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}

export default ResetPassword;
