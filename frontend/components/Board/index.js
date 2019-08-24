import React from "react";
import BoardHeader from "./BoardHeader";
import Header from "../Header";
import ListAdder from "../List/ListAdder";
import List from "../List";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../Error";
import Loading from "../Loading";

import * as S from  "./_board";

const SINGLE_BOARD_QUERY = gql`
  query SINGLE_BOARD_QUERY($id: ID!) {
    board(where: { id: $id }) {
      id
      title
      lists {
        title
        id
      }
    }
  }
`;

class Board extends React.Component {
  render() {
    const {id} = this.props.query;

    return (
      <React.Fragment>
        <S.Board className="board">

          <Query
            query={SINGLE_BOARD_QUERY}
            variables={{ id: id }}
            fetchPolicy="cache-and-network"
          >
            {({ error, loading, data, refetch }) => {
              if (error) return <Error error={error} />;
              if (loading) return <Loading />;

              const { title, lists } = data.board;

              return (
                <React.Fragment>
                  <BoardHeader
                    title={title}
                    id={id}
                  />
                  <div className="board__list-wrapper">
                    <div className="board__lists">
                      {lists.map((list, index) => {
                        return (
                          <List
                            index={index}
                            key={index}
                            {...list}
                            boardId={id}
                            refetch={refetch}
                          />
                        );
                      })}
                      <ListAdder
                        board={this.props.board}
                        boardId={id}
                        refetch={refetch}
                      />
                    </div>
                  </div>

                </React.Fragment>
              );
            }}
          </Query>
        </S.Board>
      </React.Fragment>
    );
  }
}

export default Board;
export { SINGLE_BOARD_QUERY };
