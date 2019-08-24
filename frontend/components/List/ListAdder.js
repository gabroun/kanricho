import React from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { SINGLE_BOARD_QUERY } from "../Board";
import Error from "../Error";

import * as S from "./_listAdder";
const CREATE_LIST_MUTATION = gql`
  mutation CREATE_LIST_MUTATION(
    $title: String!
    $boardId: ID!
  ) {
    createList(
      title: $title
      board: { connect: { id: $boardId } }
    ) {
      id
      title
      board {
        title
      }
    }
  }
`;

class ListAdder extends React.Component {
  constructor(props) {
    super(props);
    // mintCream: "#F7FFF7",
    this.state = {
      isOpen: false,
      listTitle: "",
      listColor: {
        englishGreen: "#1A535C",
        mediumTurquiose: "#4ECDC4",
        prussianBlue: "#003459",
        pastelRed: "#FF6B6B",
        maize: "#FFE66D"
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.update = this.update.bind(this);
    this.randomiseListColor = this.randomiseListColor.bind(this);
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
    // ignore click on button itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  handleChange(e) {
    let val = e.target.value;
    this.setState(() => {
      return {
        listTitle: val
      };
    });
  }

  async handleKeydown(e, createList) {
    if (e.keyCode === 13) {
      // enter key
      e.preventDefault();
      const res = await createList();

      // this.setState(() => {
      //   return {
      //     isOpen: !this.state.isOpen,
      //     listTitle: ""
      //   };
      // });
    } else if (e.keyCode === 27) {
      // escape key
      this.setState(() => {
        return {
          isOpen: !this.state.isOpen,
          listTitle: ""
        };
      });
    }
  }

  update(cache, payload, refetch) {
    const data = cache.readQuery({
      query: SINGLE_BOARD_QUERY,
      variables: { id: this.props.boardId }
    });

    const newList = {
      title: payload.data.createList.title,
      id: payload.data.createList.id,
      __typename: payload.data.createList.__typename
    };

    data.board.lists = data.board.lists.concat(newList);
    cache.writeQuery({ query: SINGLE_BOARD_QUERY, data });
    refetch();
  }

  randomiseListColor() {
    const { listColor } = this.state;
    const keys = Object.keys(listColor);
    return listColor[keys[(keys.length * Math.random()) << 0]];
  }

  render() {
    const { refetch } = this.props;

    return (
      <S.ListAdder
        className="list-adder"
        ref={node => {
          this.node = node;
        }}
      >
        <Mutation
          mutation={CREATE_LIST_MUTATION}
          variables={{
            title: this.state.listTitle,
            boardId: this.props.boardId,
            // listColor: this.randomiseListColor()
          }}
          update={(cache, payload) => this.update(cache, payload, refetch)}
        >
          {(createList, { error }) => {
            if (error) return <Error error={error} />;
            return (
              <React.Fragment>
                {!this.state.isOpen ? (
                  <button
                    className="list-adder__btn"
                    onClick={this.handleClick}
                  >
                    + Add new list
                  </button>
                ) : (
                  <input
                    className="list-adder__input"
                    autoFocus
                    placeholder="+ Add a new list"
                    value={this.state.listTitle}
                    onChange={this.handleChange}
                    onKeyDown={e => this.handleKeydown(e, createList)}
                  />
                )}
              </React.Fragment>
            );
          }}
        </Mutation>
      </S.ListAdder>
    );
  }
}

export default ListAdder;
