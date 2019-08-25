import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ALL_BOARDS_QUERY } from "../Dashboard/Boards";
import { MdDelete } from "react-icons/md";
import Error from "../Error";
import * as S from "./_boardDeleter";
import Router from "next/router";

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
  update(cache, payload) {
    // manually update the cache on the client to match the server
    // read the cache for the items
    const data = cache.readQuery({ query: ALL_BOARDS_QUERY });
    // filter the deleted items out of the page
    data.boards = data.boards.filter(board => {
      return board.id !== payload.data.deleteBoard.id;
    });
    // put the items back
    cache.writeQuery({ query: ALL_BOARDS_QUERY, data });
  }
  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      <Mutation
        mutation={DELETE_BOARD_MUTATION}
        variables={{
          id: this.props.id
        }}
        update={this.update}
      >
        {(deleteBoard, { error }) => {
          if (error) return <Error error={error} />;
          return (
            <S.BoardDeleter className="board-deleter">
              <button onClick={this.handleClick} className="board-deleter__btn">
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
                      Router.push({ pathname: "/" });
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
  }
}

export default BoardDeleter;
