import styled from 'styled-components';

export const BoardAdder = styled.div`

    margin: 5px;
    .board-adder__form {
      width: 100%;
      height: 140px;
      background-color: #ddd;
      color: #444;
      font-size: 16px;
      box-sizing: border-box;
      border-radius: 6px;
      padding: 8px;
      fieldset {
        border: none;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 4px;
        border-radius: 3px;
        border: 0;
        overflow: hidden;
        resize: none;
      }

      button {
        padding: 8px 12px;
        margin: 8px 0 0;
        border: none;
        border-radius: 3px;
        background-color: #5aac44;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;
      }
    }

    .board-adder__btn {
      background-color: #ccc;
      width: 100%;
      height: 140px;
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
      color: #444;
      border: 0;
      box-sizing: border-box;
      border-radius: 6px;
      font-weight: 700;
      outline: none;
    }


`;

