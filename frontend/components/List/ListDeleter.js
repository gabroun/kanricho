import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { SINGLE_BOARD_QUERY } from "../Board";
import Error from "../Error";

const DELETE_LIST_MUTATION = gql`
  mutation DELETE_LIST_MUTATION($id: ID!) {
    deleteList(id: $id) {
      id
    }
  }
`;

class ListDeleter extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update(cache, payload, refetch) {
    const data = cache.readQuery({
      query: SINGLE_BOARD_QUERY,
      variables: {
        id: this.props.boardId
      }
    });
    data.board.lists = data.board.lists.filter(list => {
      return list.id !== payload.data.deleteList.id;
    });

    cache.writeQuery({ query: SINGLE_BOARD_QUERY, data });
  }
  render() {
    const { refetch } = this.props;
    return (
      <Mutation
        mutation={DELETE_LIST_MUTATION}
        variables={{ id: this.props.listId }}
        update={(cache, payload) => this.update(cache, payload, refetch)}
        optimisticResponse={{
          __typename: "Mutation",
          deleteList: {
            id: this.props.listId,
            __typename: "List"
          }
        }}
      >
        {(deleteList, { error }) => {
          if (error) return <Error error={error} />;
          return (
            <a
              onClick={() => {
                deleteList();
                this.props.popoverOpen();
              }}
            >
              Delete List
            </a>
          );
        }}
      </Mutation>
    );
  }
}

export default ListDeleter;
