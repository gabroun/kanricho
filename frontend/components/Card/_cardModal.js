import styled from 'styled-components';

  export const TextAreaWrapper = styled.div`
   display: flex;
      justify-content: space-between;
      flex-shrink: 0;
      flex-direction: column;
      box-sizing: border-box;
      margin-bottom: 6px;
      border-radius: 3px;
      transition: background 0.2s;
      .modal__textarea {
        border-radius: 3px;
      box-sizing: border-box;
      }
  `;

  export const SaveButton = styled.input`
   margin-top: 10px;
      cursor: pointer;
      line-height: 20px;
      padding: 6px 12px;
      text-align: center;
      border-radius: 3px;
      box-sizing: border-box;
      background-color: #5aac44;
      box-shadow: none;
      border: none;
      color: #fff;
      max-width: 80px;
  `;
