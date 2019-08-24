import styled from 'styled-components';

export const ListAdder = styled.div`
  display: grid;
  .list-adder__btn {
    display: inline-flex;
    flex-shrink: 0;
    /* width: 300px; */
    margin: 0 5px;
    padding: 10px;
    border: none;
    border-radius: 6px;
    color: #444;
    background: rgba(0, 0, 0, 0.15);
    font-size: 14px;
    transition: background 0.2s;
    user-select: none;
    cursor: pointer;
  }

  .list-adder__input {
    float: left;
    box-sizing: border-box;
    /* width: 100%; */
    padding: 6px 10px;
    border: 0;
    border-radius: 3px;
    color: #222;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    overflow: hidden;
    resize: none;
    height: 37px;
    margin: 0 5px;
    border: solid 1px #323c50bf;
  }
`;