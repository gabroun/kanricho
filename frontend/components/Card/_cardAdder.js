import styled from 'styled-components';

export const CardAdder = styled.div`

  display: flex;
  /* justify-content: center; */
  background: rgba(50, 60, 80, 0.75);
  margin: 0 5px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 0.1rem 0.5rem 0.5rem;
  .card-adder__btn {
    align-self: center;
    flex-shrink: 0;
    /* width: 39px; */
     /* height: 39px; */
    margin-top: 6px;
    border: none;
    border-radius: 6px;
    color: #fbfbfb;
    background: transparent;
    font-size: 16px;
    transition: background 0.1s;
    cursor: pointer;
  }
  .card-adder__content {
    box-sizing: border-box;
    padding: 10px 8px;
    border: 0;
    border-radius: 3px;
    color: inherit;
    font-family: inherit;
    font-size: 16px;
    resize: none;
    /* width: 284px; */
    height: 38px;
    margin-top: 6px;
    margin-left: 5px;
  }


`;