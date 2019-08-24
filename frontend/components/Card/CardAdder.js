import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { SINGLE_LIST_QUERY } from "../List";
import Error from "../Error";

import * as S from  "./_cardAdder";

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($content: String!, $listId: ID!) {
    createCard(content: $content, list: { connect: { id: $listId } }) {
      id
      content
      list {
        title
      }
    }
  }
`;

class CardAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cardContent: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.update = this.update.bind(this);
  }
  handleClick() {
    !this.state.isOpen
      ? document.addEventListener("click", this.handleOutsideClick, false)
      : document.removeEventListener("click", this.handleOutsideClick, false);

    this.setState({ isOpen: !this.state.isOpen });
  }

  handleChange(e) {
    let cardVal = e.target.value;
    this.setState({ cardContent: cardVal });
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  async handleKeyDown(e, createCard) {
    if (e.keyCode === 13 && event.shiftKey === false) {
      e.preventDefault();
      const res = await createCard();

      // this.setState({
      //   isOpen: !this.state.isOpen,
      //   cardContent: ""
      // });
    } else if (e.keyCode === 27) {
      this.setState({
        isOpen: !this.state.isOpen,
        cardContent: ""
      });
    }
  }

  update(cache, payload, refetch) {
    const data = cache.readQuery({
      query: SINGLE_LIST_QUERY,
      variables: {
        id: this.props.listId
      }
    });

    const newCard = {
      content: payload.data.createCard.content,
      id: payload.data.createCard.id,
      list: payload.data.createCard.list,
      __typename: "Card"
    };

    data.list.cards = data.list.cards.concat(newCard);
    cache.writeQuery({ query: SINGLE_LIST_QUERY, data });
    refetch();
  }

  render() {
    const { refetch } = this.props;
    return (
      <React.Fragment>
        <S.CardAdder
          className="card-adder"
          ref={node => {
            this.node = node;
          }}
        >
          {this.state.isOpen ? (
            <Mutation
              mutation={CREATE_CARD_MUTATION}
              variables={{
                content: this.state.cardContent,
                listId: this.props.listId
              }}
              update={(cache, payload) => this.update(cache, payload, refetch)}
            >
              {(createCard, { error }) => {
                if (error) return <Error error={error} />;
                return (
                  <form onSubmit={this.handleSubmit}>
                    <textarea
                      className="card-adder__content"
                      autoFocus
                      spellCheck={false}
                      placeholder="add a new card"
                      value={this.state.cardContent}
                      onChange={this.handleChange}
                      onKeyDown={e => this.handleKeyDown(e, createCard)}
                    />
                  </form>
                );
              }}
            </Mutation>
          ) : (
            <button className="card-adder__btn" onClick={this.handleClick}>
              + Add
            </button>
          )}
        </S.CardAdder>
      </React.Fragment>
    );
  }
}

export default CardAdder;
