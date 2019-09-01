import styled from "styled-components";

export const BoardDeleter = styled.div`
  position: relative;
  font-size: 16px;
  .board-deleter {
    &__btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 8px 10px;
      border-radius: 3px;
      color: #073b4c;
      transition: background 0.1s;
      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 16px;
      outline: none;
      svg {
        padding-right: 5px;
        font-size: 24px;
      }
    }

    &__menu {
      position: absolute;
      top: 100%;
      right: 0;
      display: flex;
      flex-direction: column;
      width: 140px;
      margin-top: 4px;
      padding: 5px;
      border-radius: 3px;
      color: #073b4c;
      background: #fbfbfb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      font-weight: 700;
      text-align: center;
      &-btn {
        margin-top: 5px;
        padding: 8px 30px;
        border-radius: 6px;
        color: #fff;
        background: red;
        text-align: center;
        cursor: pointer;
        z-index: 1;
      }
    }
  }
`;
