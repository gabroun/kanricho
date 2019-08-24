import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import BoardDeleter from "./BoardDeleter";
import Error from "../Error";
import * as S from  "./_boardHeader";
const SINGLE_BOARD_QUERY = gql`
  query SINGLE_BOARD_QUERY($id: ID!) {
    board(where: { id: $id }) {
      title
      id
    }
  }
`;

const UPDATE_BOARD_MUTATION = gql`
  mutation UPDATE_BOARD_MUTATION($id: ID!, $title: String!) {
    updateBoard(id: $id, title: $title) {
      title
      id
    }
  }
`;

class BoardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      title: this.props.title
    };

    this.handleBoardTitleChange = this.handleBoardTitleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handlekeyDown = this.handlekeyDown.bind(this);
  }

  handleClick() {
    !this.state.isOpen
      ? document.addEventListener("click", this.handleOutsideClick, false)
      : document.removeEventListener("click", this.handleOutsideClick, false);
    this.setState(() => {
      return {
        isOpen: !this.state.isOpen
      };
    });
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  handleBoardTitleChange(e) {
    const newTitle = e.target.value;
    this.setState({
      title: newTitle
    });
  }

  async handlekeyDown(e, updateBoardTitle) {
    if (e.keyCode === 13) {
      const res = await updateBoardTitle({
        variables: {
          id: this.props.id,
          title: this.state.title
        }
      });

      this.setState(() => {
        return {
          isOpen: false
        };
      });
    } else if (e.keyCode === 27) {
      this.setState({
        title: this.props.title,
        isOpen: false
      });
    }
  }

  render() {
    return (
      <S.BoardHeader className="board__header">
        <div
          className="board__header-title"
          ref={node => {
            this.node = node;
          }}
        >
          <Query query={SINGLE_BOARD_QUERY} variables={{ id: this.props.id }}>
            {({ data, loading }) => {
              if (loading) return <p>loading...</p>;
              return (
                <Mutation
                  mutation={UPDATE_BOARD_MUTATION}
                  variables={{
                    id: this.props.id,
                    title: this.state.title
                  }}
                >
                  {(updateBoard, { error }) => {
                    if (error) return <Error error={error} />;
                    return (
                      <React.Fragment>
                        {!this.state.isOpen ? (
                          <button onClick={this.handleClick}>
                            <h1>{this.props.title}</h1>
                          </button>
                        ) : (
                          <input
                            type="text"
                            autoFocus
                            defaultValue={data.board.title}
                            onChange={this.handleBoardTitleChange}
                            onKeyDown={e => this.handlekeyDown(e, updateBoard)}
                          />
                        )}
                      </React.Fragment>
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>
          </div>
        <BoardDeleter id={this.props.id}  />

      </S.BoardHeader>
    );
  }
}

export default BoardHeader;
