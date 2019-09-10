import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { MdModeEdit, MdDelete, MdMore } from "react-icons/md";

import { SINGLE_LIST_QUERY } from "../List";
import CardModal from "./CardModal";
import Error from "../Error";
import * as S from "./_card";

const DELETE_CARD_MUTATION = gql`
  mutation DELETE_CARD_MUTATION($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`;

const UPDATE_CARD_PRIORITY_MUTATION = gql`
  mutation UPDATE_CARD_PRIORITY_MUTATION($id: ID!, $priority: String) {
    updateCard(id: $id, priority: $priority) {
      content
      id
      priority
    }
  }
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isCardMoreOpen: false,
      isPriorityOptionsOpen: false,
      priortyOptions: [
        { High: { color: "#e44258", value: "High" } },
        { Medium: { color: "#579bfc", value: "Medium" } },
        { Low: { color: "#a358dfc4", value: "Low" } },
        { "": { color: "#c4c4c4", value: "" } }
      ],
      prioritySelected: this.props.priority
    };
    this.handleClick = this.handleClick.bind(this);
    this.update = this.update.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleCardMoreClick = this.handleCardMoreClick.bind(this);
    this.handlePriorityOptions = this.handlePriorityOptions.bind(this);
    this.handlePrioritySelection = this.handlePrioritySelection.bind(this);
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
  }

  handleModalClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleCardMoreClick() {
    this.setState({ isCardMoreOpen: !this.state.isCardMoreOpen });
  }

  handlePriorityOptions(e) {
    this.setState({ isPriorityOptionsOpen: !this.state.isPriorityOptionsOpen });
  }

  async handlePrioritySelection(e, updateCard) {
    const priority = e.target.dataset.priority;

    const res = await updateCard({
      variables: {
        id: this.props.id,
        priority: priority
      }
    });
    this.setState({ prioritySelected: priority });
  }

  render() {
    const { content, refetch, id, listColor } = this.props;
    const { priortyOptions, prioritySelected } = this.state;
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
        <div className="card__priority" onClick={this.handlePriorityOptions}>
          <Mutation
            mutation={UPDATE_CARD_PRIORITY_MUTATION}
            variables={{
              id: id,
              priority: this.state.prioritySelected
            }}
          >
            {(updateCard, { error }) => {
              if (error) return <Error error={error} />;

              return (
                <>
                  <div
                    className="card__priority-selected"
                    style={{
                      backgroundColor: priortyOptions.find(
                        option => option[prioritySelected]
                      )[prioritySelected].color
                    }}
                  >
                    {this.state.prioritySelected}
                  </div>
                  {this.state.isPriorityOptionsOpen && (
                    <div className="status-options-menu">
                      <svg viewBox="0 0 30 30" className="status-arrow">
                        <path
                          className="pt-popover-arrow-border"
                          d="M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z"
                        ></path>
                        <path
                          className="pt-popover-arrow-fill"
                          d="M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z"
                        ></path>
                      </svg>
                      <div className="status-options">
                        <div
                          className="status-options-item"
                          style={{ backgroundColor: "#e44258" }}
                          data-priority="High"
                          onClick={e =>
                            this.handlePrioritySelection(e, updateCard)
                          }
                        >
                          High
                        </div>
                        <div
                          className="status-options-item"
                          style={{ backgroundColor: "#579bfc" }}
                          data-priority="Medium"
                          onClick={e =>
                            this.handlePrioritySelection(e, updateCard)
                          }
                        >
                          Medium
                        </div>
                        <div
                          className="status-options-item"
                          style={{ backgroundColor: "#a358dfc4" }}
                          data-priority="Low"
                          onClick={e =>
                            this.handlePrioritySelection(e, updateCard)
                          }
                        >
                          Low
                        </div>
                        <div
                          className="status-options-item"
                          style={{ backgroundColor: "#c4c4c4" }}
                          data-priority=""
                          onClick={e =>
                            this.handlePrioritySelection(e, updateCard)
                          }
                        ></div>
                      </div>
                    </div>
                  )}
                </>
              );
            }}
          </Mutation>
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
                  optimisticResponse={{
                    __typename: "Mutation",
                    deleteCard: {
                      id: this.props.id,
                      __typename: "Card"
                    }
                  }}
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
