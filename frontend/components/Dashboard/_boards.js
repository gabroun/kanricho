import styled from 'styled-components';

export const BoardsContainer = styled.div`
    max-width: 1080px;
    margin: 40px auto;
    padding: 0 20px;
    .boards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

      a {
        background: #06a;
        box-sizing: border-box;
        height: 140px;
        margin: 5px;
        padding: 10px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 700;
        transition: background 0.1s;
        cursor: pointer;
        display: inline-flex;
        flex-direction: column;
        color: #fff;
        overflow-wrap: break-word;
        text-decoration: none;
      }
    }

    h1 {
      font-size: 1.7rem;
    }
`;

