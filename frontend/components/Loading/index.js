import React from "react";
import styled from 'styled-components';

const StyledLoading = styled.div`
    position: relative;
    p {
      color: #2f3d4c;
      font-size: 14px;
      z-index: 2;
      position: absolute;
     /* bottom: -20px;
      font-family: "Roboto Mono", monospace; */
      animation: text 4s ease infinite;
      width: 100px;
      text-align: center;
    }

    @keyframes text {
      0% {
        transform: translateX(-30px);
        letter-spacing: 0px;
        color: #bacbd9;
      }
      25% {
        letter-spacing: 3px;
        color: #2f3d4c;
      }
      50% {
        transform: translateX(30px);
        letter-spacing: 0px;
        color: #bacbd9;
      }
      75% {
        letter-spacing: 3px;
        color: #2f3d4c;
      }
      100% {
        transform: translateX(-30px);
        letter-spacing: 0px;
        color: #bacbd9;
      }
    }

    svg {
      animation: 2s linear infinite svg-animation;
      max-width: 100px;
    }

    @keyframes svg-animation {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }

    circle {
      animation: 1.4s ease-in-out infinite both circle-animation;
      display: block;
      fill: transparent;
      stroke: #2f3d4c;
      stroke-linecap: round;
      stroke-dasharray: 283;
      stroke-dashoffset: 280;
      stroke-width: 10px;
      transform-origin: 50% 50%;
    }

    @keyframes circle-animation {
      0%,
      25% {
        stroke-dashoffset: 280;
        transform: rotate(0);
      }

      50%,
      75% {
        stroke-dashoffset: 75;
        transform: rotate(45deg);
      }

      100% {
        stroke-dashoffset: 280;
        transform: rotate(360deg);
      }
    }
`;

const Loading = () => {
  return (
    <StyledLoading>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" />
      </svg>
      <p>Loading...</p>
    </StyledLoading>
  );
};

export default Loading;
