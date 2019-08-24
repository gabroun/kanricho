import React from "react";
import CardAdder from "../Card/CardAdder";
import Card from "../Card";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import ListDeleter from "./ListDeleter";
import Error from "../Error";

import * as S from "./_list";

const SINGLE_LIST_QUERY = gql`
  query SINGLE_LIST_QUERY($id: ID!) {
    list(where: { id: $id }) {
      id
      title
      cards {
        content
        id
      }
    }
  }
`;

const UPDATE_LIST_MUTATION = gql`
  mutation UPDATE_LIST_MUTATION($id: ID!, $title: String!) {
    updateList(id: $id, title: $title) {
      title
      id
    }
  }
`;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      title: this.props.title,
      isOpen: false
    };

    this.handlePopover = this.handlePopover.bind(this);
    this.handleListTitleChange = this.handleListTitleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handlekeydown = this.handlekeydown.bind(this);
  }
  handlePopover() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  handleListTitleChange(e) {
    const newTitle = e.target.value;
    this.setState({
      title: newTitle
    });
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
    if (this.node.contains(e.target)) return;
    this.handleClick();
  }

  async handlekeydown(e, updateListTitle) {
    if (e.keyCode === 13) {
      const res = await updateListTitle({
        variables: {
          id: this.props.id,
          title: this.state.title
        }
      });

      this.setState({ isOpen: false });
    } else if (e.keyCode === 27) {
      this.setState(() => {
        return {
          isOpen: !this.state.isOpen,
          title: ""
        };
      });
    }
  }

  render() {
    const { title, id, refetch } = this.props;

    return (
      <S.ListContainer className="list-container">
        <div className="list">
          <div className="list__header">
            <div
              ref={node => (this.node = node)}
              className="list__header-wrapper"
            >
              <Mutation
                mutation={UPDATE_LIST_MUTATION}
                variables={{
                  id: this.props.id,
                  title: this.state.title
                }}
              >
                {(updateList, { error }) => {
                  if (error) return <Error error={error} />;
                  return (
                    <React.Fragment>
                      {!this.state.isOpen ? (
                        <button
                          className="list__header-title"
                          onClick={this.handleClick}
                        >
                          <span>{title}</span>
                        </button>
                      ) : (
                        <input
                          type="text"
                          autoFocus
                          defaultValue={title}
                          onChange={this.handleListTitleChange}
                          onKeyDown={e => this.handlekeydown(e, updateList)}
                        />
                      )}
                    </React.Fragment>
                  );
                }}
              </Mutation>
            </div>

            <div className="list__header-priority">
              <div>priority</div>
            </div>
            <div className="list__header-extra">
              <a href="#" onClick={this.handlePopover}>
                ...
              </a>
              {this.state.popoverOpen && (
                <div className="list-menu">
                  <div className="list-menu__header">
                    <span>List Actions</span>
                    <a
                      className="list-menu__close-btn"
                      onClick={() => this.setState({ popoverOpen: false })}
                    >
                      ✖
                    </a>
                  </div>
                  <ul className="list-menu__list">
                    <li>
                      <ListDeleter
                        listId={this.props.id}
                        boardId={this.props.boardId}
                        popoverOpen={this.handlePopover}
                        refetch={this.props.refetch}
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <S.Cards className="cards">
            <Query
              query={SINGLE_LIST_QUERY}
              variables={{ id: this.props.id }}

            >
              {({ error, loading, data, refetch }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading!</p>;
                const { cards, color } = data.list;
                return cards.map((card, index) => {
                  return (

                    <Card
                      {...card}
                      key={index}
                      refetch={refetch}
                      listId={this.props.id}
                      // listColor={color}
                    />
                  );
                });
              }}
            </Query>
          </S.Cards>
        </div>
        <CardAdder listId={id} listTitle={title} refetch={refetch} />
      </S.ListContainer>
    );
  }
}

export default List;
export { SINGLE_LIST_QUERY };
