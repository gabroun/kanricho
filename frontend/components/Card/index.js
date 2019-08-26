import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { SINGLE_LIST_QUERY } from "../List";
import CardModal from "./CardModal";
import Error from "../Error";
import { MdModeEdit, MdDelete, MdMore } from "react-icons/md";
import * as S from "./_card";

const DELETE_CARD_MUTATION = gql`
  mutation DELETE_CARD_MUTATION($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isCardMoreOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.update = this.update.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleCardMoreClick = this.handleCardMoreClick.bind(this);
  }

  async handleClick(deleteCard) {
    const res = await deleteCard();
    this.handleCardMoreClick();
  }

  update(cache, payload, refetch) {
    const data = cache.readQuery({
      query: SINGLE_LIST_QUERY,
      variables: {
        id: this.props.listId
      }
    });

    data.list.cards = data.list.cards.filter(card => {
      return card.id !== payload.data.deleteCard.id;
    });

    cache.writeQuery({ query: SINGLE_LIST_QUERY, data });
    refetch();
    location.reload();
  }

  handleModalClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleCardMoreClick() {
    this.setState({ isCardMoreOpen: !this.state.isCardMoreOpen });
  }

  render() {
    const { content, refetch, id, listColor } = this.props;
    return (
      <S.CardContainer className="card-container">
        <div className="card" ref={ref => (this.ref = ref)}>
          <div
            className="card__indicator"
            style={{
              backgroundColor: listColor !== undefined ? listColor : "#fff"
            }}
          />
          <div className="card__inner">
            <span>{content}</span>
            <MdModeEdit onClick={this.handleModalClick} />
            {this.state.isOpen && (
              <CardModal
                isOpen={this.state.isOpen}
                cardElement={this.ref}
                handleModalClose={this.handleModalClick}
                cardContent={content}
                cardId={id}
              />
            )}
          </div>
        </div>
        <div className="card__priority">
          <div className="status">High</div>
        </div>
        <div className="card__more">
          <button onClick={this.handleCardMoreClick}>
            <MdMore />
          </button>
          {this.state.isCardMoreOpen && (
            <div className="card__more-menu">
              <div className="more-menu__item">
                <Mutation
                  mutation={DELETE_CARD_MUTATION}
                  variables={{ id: this.props.id }}
                  update={(cache, payload) =>
                    this.update(cache, payload, refetch)
                  }
                >
                  {(deleteCard, { error }) => {
                    if (error) return <Error error={error} />;
                    return (
                      <button
                        onClick={() => {
                          this.handleClick(deleteCard);
                        }}
                      >
                        <MdDelete /> <span>Delete Card</span>
                      </button>
                    );
                  }}
                </Mutation>
              </div>
            </div>
          )}
        </div>
      </S.CardContainer>
    );
  }
}

export default Card;
