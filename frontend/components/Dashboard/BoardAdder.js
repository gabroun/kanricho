import React from "react";
import slugify from "slugify";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_BOARDS_QUERY } from "../Dashboard/Boards";
import Router from 'next/router';

import * as S from "./_boardAdder";

const CREATE_BOARD_MUTATION = gql`
  mutation CREATE_BOARD_MUTATION($title: String!) {
    createBoard(title: $title) {
      id
      title
    }
  }
`;

class BoardAdder extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      isVisible: false,
      title: ""
    };
  }

  handleToggleOpen(e) {
    !this.state.isVisible
      ? document.addEventListener("click", this.handleOutsideClick, false)
      : document.removeEventListener("click", this.handleOutsideClick, false);

    this.setState(() => {
      return {
        isVisible: !this.state.isVisible
      };
    });
  }

  handleOutsideClick(e) {
    // ignores click on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleToggleOpen();
  }

  handleChange(e) {
    const title = e.target.value;
    this.setState(() => {
      return {
        title
      };
    });
  }

  update(cache, payload) {
    const data = cache.readQuery({
      query: ALL_BOARDS_QUERY
    });
    const newBoard = {
      title: payload.data.createBoard.title,
      id: payload.data.createBoard.id,
      __typename: payload.data.createBoard.__typename
    };

    data.boards = data.boards.concat(newBoard);
    cache.writeQuery({ query: ALL_BOARDS_QUERY, data });
  }
  render() {
    return (
      <React.Fragment>
        <S.BoardAdder>
          {/* <div className="boards"> */}
          <div
            ref={node => {
              this.node = node;
            }}
          >
            {this.state.isVisible ? (
              <Mutation
                mutation={CREATE_BOARD_MUTATION}
                variables={this.state}
                update={this.update}
              >
                {/* createBoard is the parameter name for mutation function */}
                {(createBoard, { loading, error }) => (
                  <form
                    className="board-adder__form"
                    onSubmit={async e => {
                      // stop form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createBoard();
                      const boardID = res.data.createBoard.id;

                      // change them to single item page

                      Router.push({
                        pathname: '/board',
                        query: { id: boardID },
                      });

                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                      <button
                        className="submit-board"
                        disabled={this.state.title === ""}
                      >
                        Create
                      </button>
                    </fieldset>
                  </form>
                )}
              </Mutation>
            ) : (
              <button
                onClick={this.handleToggleOpen}
                className="board-adder__btn"
              >
                Create new board..
              </button>
            )}
          </div>
          {/* </S.BoardAdder> */}
        </S.BoardAdder>
      </React.Fragment>
    );
  }
}

export default BoardAdder;
export { CREATE_BOARD_MUTATION };
