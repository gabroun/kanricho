import React from "react";
import Modal from "react-modal";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Error from "../Error";
import * as S from  "./_cardModal";
// import "./cardModal.css";
const UPDATE_CARD_MUTATION = gql`
  mutation UPDATE_CARD_MUTATION($id: ID!, $content: String!) {
    updateCard(id: $id, content: $content) {
      content
      id
    }
  }
`;

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedCardContent: this.props.cardContent
    };
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleCardUpdate = this.handleCardUpdate.bind(this);
    if (typeof document !== "undefined") {
      Modal.setAppElement("#__next");
    }
  }
  handleCardChange(e) {
    const newText = e.target.value;
    this.setState({ updatedCardContent: newText });
  }
  async handleCardUpdate(e, updateCard) {
    const res = await updateCard({
      variables: {
        id: this.props.cardId,
        content: this.state.updatedCardContent
      }
    });
    this.props.handleModalClose();
  }
  render() {
    const { cardElement, isOpen, handleModalClose, cardId } = this.props;
    if (!cardElement) return null;

    // card dimension to use for card modal dimension
    const cardDOMRec = cardElement.getBoundingClientRect();

    const isCardNearRightBorder =
      window.innerWidth - cardDOMRec.right < cardDOMRec.left;

    const isSmallMobile = window.innerWidth < 550;

    // Position textarea at the same place as the card and position everything else away from closest edge
    const style = {
      content: {
        top: Math.min(
          cardDOMRec.top,
          window.innerHeight - cardDOMRec.height - 18
        ),
        left: isCardNearRightBorder ? null : cardDOMRec.left,
        right: isCardNearRightBorder
          ? window.innerWidth - cardDOMRec.right
          : null,
        flexDirection: isCardNearRightBorder ? "row-reverse" : "row"
      }
    };

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: "column",
        top: 3,
        left: 3,
        right: 3
      }
    };

    return (
      <Modal
        className="modal"
        overlayClassName="modal-underlay"
        onRequestClose={handleModalClose}
        closeTimeoutMS={200}
        isOpen={isOpen}
        style={style}
      >
        <S.TextAreaWrapper
          className="modal__textarea-wrapper"
          style={{
            minHeight: cardDOMRec.height,
            width: cardDOMRec.width
          }}
        >
          <Mutation
            mutation={UPDATE_CARD_MUTATION}
            variables={{
              id: cardId,
              content: this.state.updatedCardContents
            }}
          >
            {(updateCard, { error }) => {
              if (error) return <Error error={error} />;
              return (
                <React.Fragment>
                  <textarea
                    style={{
                      height: cardDOMRec.height
                    }}
                    className="modal__textarea"
                    value={this.state.updatedCardContent}
                    onChange={this.handleCardChange}
                  />
                  <S.SaveButton
                    type="submit"
                    value="Save"
                    className="modal__saveBtn"
                    onClick={e => this.handleCardUpdate(e, updateCard)}
                  />
                </React.Fragment>
              );
            }}
          </Mutation>
        </S.TextAreaWrapper>
     </Modal>
    );
  }
}

export default CardModal;
