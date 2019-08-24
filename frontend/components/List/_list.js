import styled from 'styled-components';
export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
  .list {
    box-sizing: border-box;
    /* width: 300px; */
    min-height: 0;
    max-height: 100%;
    margin: 0 5px;
    border-radius: 6px;
    font-size: 14px;
    transition: box-shadow 0.15s, background 0.3s;
    background: rgba(50, 60, 80, 0.75);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    &__header {
       /* display: flex;
       flex-shrink: 0;
       border-top-right-radius: 6px;
       border-top-left-radius: 6px;
      font-size: 18px;
       justify-content: space-between; */
       display: grid;
    grid-template-columns: 1fr 130px 50px;
    grid-gap: 10px;
    padding: 0 0.5rem;
    margin: 8px 5px 0;

      &-wrapper {
        input {
          height: 37px;
          font-size: 12px;
          outline: none;
        }
      }

      &-title {
        padding: 10px 10px 10px 20px;
        border: none;
        background-color: transparent;
        font-size: 16px;
        color: #fbfbfb;
        font-weight: 700;
        overflow-wrap: break-word;
        cursor: pointer;
        text-transform: capitalize;
        outline: none;
      }

      &-priority {
        justify-self: center;
        align-self: center;
        color: #fbfbfb;
      }

      &-extra {
        padding: 10px;
        color: white;
        font-size: 20px;
        position: relative;
        justify-self: center;
        line-height: 10px;
        a {
          color: white;
          text-decoration: none;
        }

        .list-menu {
          position: absolute;
          background-color: white;
          border-radius: 8px;
          width: 200px;
          box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
            0 0 0 1px rgba(9, 30, 66, 0.08);
          display: block;
          color: black;
          font-size: 14px;
          padding: 12px;
          left: -190px;
          z-index: 1;

          &__header {
            border-bottom: 1px solid #091e4221;
            display: grid;
            justify-content: center;
            padding-bottom: 10px;
            grid-template-columns: 1.25fr 0.75fr;
            span {
              justify-self: start;
            }
          }

          &__close-btn {
            color: #000;
            justify-self: end;
            cursor: pointer;
          }

          &__list {
            list-style: none;
            padding: 0;

            a {
              color: #000;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  `;
 export const Cards = styled.div`
  border-radius: 0.2rem;
    padding: 0 0.5rem;
 `;
