import React from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { SINGLE_BOARD_QUERY } from "../Board";
import Error from "../Error";
import ClickOutside from "../ClickOutside";

import * as S from "./_listAdder";
const CREATE_LIST_MUTATION = gql`
  mutation CREATE_LIST_MUTATION(
    $title: String!
    $boardId: ID!
    $listColor: String
  ) {
    createList(
      title: $title
      board: { connect: { id: $boardId } }
      color: $listColor
    ) {
      id
      title
      color
      board {
        title
      }
    }
  }
`;

class ListAdder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      listTitle: "",
      listColor: {
        englishGreen: "#1A535C",
        mediumTurquiose: "#4ECDC4",
        prussianBlue: "#003459",
        pastelRed: "#FF6B6B",
        maize: "#FFE66D",
        infraRed: "#EF476F",
        orangeYellow: "#FFD166",
        caribbeanGreen: "#06D6A0",
        cyanBlue: "#118AB2",
        warmBlack: "#073B4C"
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.update = this.update.bind(this);
    this.randomiseListColor = this.randomiseListColor.bind(this);
  }

  handleClick() {
    this.setState(() => {
      return {
        isOpen: !this.state.isOpen
      };
    });
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
      <S.ListAdder className="list-adder">
        <Mutation
          mutation={CREATE_LIST_MUTATION}
          variables={{
            title: this.state.listTitle,
            boardId: this.props.boardId,
            listColor: this.randomiseListColor()
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
                  <ClickOutside handleClickOutside={this.handleClick}>
                    <input
                      className="list-adder__input"
                      autoFocus
                      placeholder="+ Add a new list"
                      value={this.state.listTitle}
                      onChange={this.handleChange}
                      onKeyDown={e => this.handleKeydown(e, createList)}
                    />
                  </ClickOutside>
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
