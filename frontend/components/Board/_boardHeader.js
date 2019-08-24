import styled from 'styled-components';

export const BoardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    color: #444;
    max-height: 70px;
    .board__header-title {
      h1 {
        font-size: 20px;
        line-height: 20px;
        color: #444;
        text-transform: capitalize;
      }
      input {
        background-color: #fff;
        font-weight: 700;
        font-size: 18px;
        height: 30px;
        padding: 0 10px 0 9px;
        color: black;
        margin-left: 5px;
      }
      button {
        display: flex;
        min-width: 0;
        padding: 0 10px;
        border: 0;
        border-radius: 3px;
        background: transparent;
        transition: background 0.1s;
        cursor: pointer;
        color: white;
        line-height: 12px;
        font-size: 12px;
        margin-left: 5px;
        &:hover {
          border: 1px dashed #c5c7d0;
          box-sizing: border-box;
          cursor: text;
        }
      }
    }

  `;