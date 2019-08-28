import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

import { MdDelete } from "react-icons/md";
import Router from "next/router";
import Error from "../Error";
import * as S from "./_boardDeleter";
import { ALL_BOARDS_QUERY } from "../Dashboard/Boards";

import { CURRENT_USER_QUERY } from "../User";

const DELETE_BOARD_MUTATION = gql`
  mutation DELETE_BOARD_MUTATION($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`;
class BoardDeleter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.update = this.update.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  update(cache, payload, email, refetch) {
    // manually update the cache on the client to match the server
    // read the cache for the items
    const data = cache.readQuery({
      query: ALL_BOARDS_QUERY,
      variables: {
        email
      }
    });
    // filter the deleted items out of the page
    data.boards = data.boards.filter(board => {
      return board.id !== payload.data.deleteBoard.id;
    });
    // put the items back
    cache.writeQuery({ query: ALL_BOARDS_QUERY, data });

    refetch();
  }
  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    const { refetch } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { me }, loading }) => {
          const { email } = me;
          return (
            <Mutation
              mutation={DELETE_BOARD_MUTATION}
              variables={{
                id: this.props.id
              }}
              refetchQueries={[
                {
                  query: ALL_BOARDS_QUERY,
                  variables: {
                    email
                  }
                }
              ]}

              // update={(cache, payload) =>
              //   this.update(cache, payload, email, refetch)
              // }
            >
              {(deleteBoard, { error }) => {
                if (error) return <Error error={error} />;
                return (
                  <S.BoardDeleter className="board-deleter">
                    <button
                      onClick={this.handleClick}
                      className="board-deleter__btn"
                    >
                      <MdDelete /> Delete Board
                    </button>
                    {this.state.isOpen && (
                      <div role="menu" className="board-deleter__menu">
                        <div className="board-deleter__menu-header">
                          Are you sure?
                        </div>
                        <div
                          role="menuitem"
                          tabIndex="-1"
                          onClick={() => {
                            deleteBoard();
                            Router.push({ pathname: "/dashboard" });
                          }}
                          className="board-deleter__menu-btn"
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </S.BoardDeleter>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default BoardDeleter;
