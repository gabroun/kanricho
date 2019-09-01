import styled from "styled-components";

export const Board = styled.div`
  /* background-color: #fff; */
  height: 100%;
  /* overflow-x: hidden; */

  .board__list-wrapper {
    padding: 1rem;
  }

  .board__lists {
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); */
    grid-gap: 2rem;
    @media screen and (max-width: 767px) {
      justify-content: center;
    }
  }
`;
