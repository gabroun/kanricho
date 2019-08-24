import React from "react";
import Header from "../Header";
import BoardAdder from "./BoardAdder";
import Link from "next/link";
import slugify from "slugify";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../Loading";

import * as S from './_boards'

const ALL_BOARDS_QUERY = gql`
  query ALL_BOARDS_QUERY {
    boards {
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
        {/* <Header /> */}
        <S.BoardsContainer className="boards-container">
          <h1>Boards</h1>
          <Query query={ALL_BOARDS_QUERY} fetchPolicy="cache-and-network">
            {({ loading, data }) => {
              if (loading) return <Loading />;
              const { boards } = data;

              return (
                <div className="boards">
                  {boards.map(board => {
                    let id = board.id;
                    return (
                      // <Link
                      //   key={id}
                      //   href={`/b/${id}/${slugify(board.title, {
                      //     lower: true
                      //   })}`}
                      // >
                      <Link key={id}
                      href={{
                        pathname: "/board",
                        query: {id: id}
                      }}>
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
      </React.Fragment>
    );
  }
}

export default Boards;
export { ALL_BOARDS_QUERY };
