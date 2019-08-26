// import Nav from './Nav';
import styled from "styled-components";
import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";
import User from "../User";
import Signout from "../Signout";
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
  height: 32px;
  background: #00000059;
  padding: 30px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  align-content: center;
  align-items: center;
  line-height: 20px;
  a {
    text-decoration: none;
  }

  .header__title {
    color: #fff;
    margin: 0;
    text-align: center;
    font-size: 1.7rem;
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
    fill: #00000059;
  }
`;
const Header = () => {
  return (
    <React.Fragment>
      <StyledHeader>
        <Link href="/">
          <a>
            <h1 className="header__title">Task Management</h1>
          </a>
        </Link>
        <AccountNav />
      </StyledHeader>
      <StyledSvg
        className="header__background"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        role="presentation"
        preserveAspectRatio="none"
      >
        <path className="triangle-path" d="M0 0l503 500L500 0H0z" />
      </StyledSvg>
    </React.Fragment>
  );
};

export default Header;
