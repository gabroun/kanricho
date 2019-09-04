import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";
import styled from "styled-components";

import AccountNav from "../AccountNav";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  background: #4ecdc4;
  background-image: linear-gradient(
    to right,
    #118ab2 0%,
    #ef476f 50%,
    #118ab2 100%
  );
  padding: 20px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.2fr;
  align-content: center;
  align-items: center;
  line-height: 20px;
  a {
    text-decoration: none;
    display: inline-flex;
  }

  .header__container {
    display: flex;
    justify-content: center;
  }
  .header__title {
    color: #fff;
    margin: 0;
    text-align: center;
    font-size: 1.7rem;
    letter-spacing: 6px;
    @media screen and (max-width: 767px) {
      font-size: 24px;
      line-height: 24px;
    }
  }
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 35px;
  path {
    fill: url(#gradient);
  }
`;
const Header = () => {
  return (
    <React.Fragment>
      <StyledHeader>
        <span />
        <div className="header__container">
          <Link href="/">
            <a>
              <h1 className="header__title">Kanricho</h1>
            </a>
          </Link>
        </div>
        <AccountNav />
      </StyledHeader>
      <StyledSvg
        className="header__background"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        role="presentation"
        preserveAspectRatio="none"
      >
        <linearGradient id="gradient">
          <stop className="main-stop" offset="0%" stopColor="#118AB2" />
          <stop className="half-stop" offset="50%" stopColor="#EF476F" />
          <stop className="alt-stop" offset="100%" stopColor="#118AB2" />
        </linearGradient>
        <path className="triangle-path" d="M0 0l503 500L500 0H0z" />
      </StyledSvg>
    </React.Fragment>
  );
};

export default Header;
