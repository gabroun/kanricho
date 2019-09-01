import styled from "styled-components";
export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 130px 50px;
  margin: 8px 5px 0;
  grid-gap: 2px;
  .card {
    /* margin: 8px 5px 0; */
    color: #073b4c;
    background-color: white;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    display: grid;
    grid-template-columns: 8px 1fr;
    grid-gap: 10px;
    align-items: center;
    svg {
      justify-self: end;
      border-radius: 3px;
      background-clip: padding-box;
      background-origin: padding-box;
      padding: 4px;
      right: 2px;
      top: 2px;
      visibility: hidden;
      opacity: 0.8;
      line-height: 18px;
      font-size: 14px;
      height: 18px;
      width: 18px;
      &:hover {
        background-color: #ebecf0;
      }
      @media screen and (max-width: 1023px) {
        visibility: visible;
      }
    }
    &:hover {
      svg {
        visibility: visible;
        opacity: 1;
        color: #172b4d;
      }
    }

    &__more {
      align-self: center;
      position: relative;
      justify-self: center;
      button {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 14px;
        line-height: 18px;
        vertical-align: middle;
        cursor: pointer;
        svg {
          font-size: 20px;
          line-height: 20px;
          vertical-align: middle;
          path {
            fill: #073b4c;
          }
        }
      }
      &-menu {
        position: absolute;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0 4px 17px 6px rgba(0, 0, 0, 0.1);
        width: 264px;
        transition: all 50ms ease-in;
        transition-property: opacity, width;
        padding: 8px;
        z-index: 1;
        right: 0;
        @media screen and (max-width: 550px) {
          width: 204px;
        }
      }
    }

    &__indicator {
      width: 5px;
      height: 70%;
      position: relative;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    &__inner {
      display: grid;
      grid-template-columns: 1fr 30px;
      padding: 8px;
      align-items: center;
      svg {
        path {
          fill: #073b4c;
        }
      }
    }
    &__priority {
      background-color: white;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
      text-align: center;
      display: flex;
      justify-content: center;
      .status {
        align-self: center;
      }
    }
  }
`;
