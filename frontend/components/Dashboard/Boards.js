import React from "react";
import BoardAdder from "./BoardAdder";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Loading from "../Loading";
import { CURRENT_USER_QUERY } from "../User";

import * as S from "./_boards";

const ALL_BOARDS_QUERY = gql`
  query ALL_BOARDS_QUERY($email: String!) {
    boards(where: { user: { email: $email } }) {
      title
      id
    }
  }
`;

class Boards extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <Query query={CURRENT_USER_QUERY}>
          {({ data: { me }, loading }) => {
            return (
              <S.BoardsContainer className="boards-container">
                <h1>Boards</h1>
                <Query
                  query={ALL_BOARDS_QUERY}
                  variables={{ email: me.email }}
                  fetchPolicy="cache-and-network"
                >
                  {({ loading, data }) => {
                    if (loading) return <Loading />;
                    const { boards } = data;

                    return (
                      <div className="boards">
                        {boards.map(board => {
                          let id = board.id;
                          return (
                            <Link
                              key={id}
                              href={{
                                pathname: "/board",
                                query: { id: id }
                              }}
                            >
                              <a>{board.title}</a>
                            </Link>
                          );
                        })}

                        <BoardAdder history={history} />
                      </div>
                    );
                  }}
                </Query>
              </S.BoardsContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Boards;
export { ALL_BOARDS_QUERY };
