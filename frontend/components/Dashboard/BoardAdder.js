import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Error from "../Error";
import * as S from "./_boardAdder";
import ClickOutside from "../ClickOutside";
import { ALL_BOARDS_QUERY } from "../Dashboard/Boards";
import { CURRENT_USER_QUERY } from "../User";

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
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      isVisible: false,
      title: ""
    };
  }

  handleToggleOpen(e) {
    this.setState(() => {
      return {
        isVisible: !this.state.isVisible
      };
    });
  }

  handleChange(e) {
    const title = e.target.value;
    this.setState(() => {
      return {
        title
      };
    });
  }

  update(cache, payload, email) {
    const data = cache.readQuery({
      query: ALL_BOARDS_QUERY,
      variables: {
        email
      }
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
        <Query query={CURRENT_USER_QUERY}>
          {({ data: { me }, loading }) => {
            return (
              <S.BoardAdder>
                <div>
                  {this.state.isVisible ? (
                    <ClickOutside handleClickOutside={this.handleToggleOpen}>
                      <Mutation
                        mutation={CREATE_BOARD_MUTATION}
                        variables={this.state}
                        update={(cache, payload) =>
                          this.update(cache, payload, me.email)
                        }
                      >
                        {/* createBoard is the parameter name for mutation function */}
                        {(createBoard, { loading, error }) => (
                          <>
                            <Error error={error} />
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
                                  pathname: "/board",
                                  query: { id: boardID }
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
                          </>
                        )}
                      </Mutation>
                    </ClickOutside>
                  ) : (
                    <button
                      onClick={this.handleToggleOpen}
                      className="board-adder__btn"
                    >
                      Create new board..
                    </button>
                  )}
                </div>
              </S.BoardAdder>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default BoardAdder;
export { CREATE_BOARD_MUTATION };
