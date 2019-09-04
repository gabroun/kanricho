import React from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

import Header from "./Header";
import Meta from "./Meta";

const theme = {
  red: "#ff0000",
  black: "#393939",
  grey: "#3a3a3a",
  lightgrey: "#e1e1e1",
  offwhite: "#ededed",
  maxwidth: "1000px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)"
};

const StyledPage = styled.div`
  /* background: white; */
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxwidth};
  margin: 0 auto;
  padding: 2rem;
  /* background-color: #f7fff7; */
  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

injectGlobal`
    html {
        box-sizing: border-box;
        /* font-size: 10px; */
        height: 100%;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        /* font-size: 1.5rem;
        line-height: 2; */
        font-family: Helvetica Neue, Segoe UI, Trebuchet MS, Geneva, Tahoma, sans-serif;
        height: 100%;
        /* background-color: #F7FFF7; */
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
    .modal-underlay {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          opacity: 0;
        }

        .ReactModal__Overlay--after-open {
          opacity: 1;
          transition: opacity 0.15s;
        }

        .modal {
          position: absolute;
          display: flex;
          align-items: flex-start;
          height: 0;
          outline: 0;
        }
`;
class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
