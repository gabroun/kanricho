import React from "react";

import styled from "styled-components";

const ErrorStyles = styled.div`
  padding: 1.5rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Oh no!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p>
        <strong>Oh no!</strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </ErrorStyles>
  );
};

export default DisplayError;
