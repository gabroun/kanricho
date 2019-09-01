import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Title = styled.h2`
  color: #073b4c;
  font-size: 36px;
  letter-spacing: 2px;
  .title-color {
    color: #06d6a0;
  }
`;

const StyledContainer = styled.div`
  padding: 1rem;
  margin: 0 auto;
  display: grid;
  text-align: center;
  grid-gap: 20px;
  .desc {
    width: 60%;
    line-height: 25px;
    color: #073b4c;
    margin: 0 auto;
    font-size: 18px;
    @media screen and (max-width: 767px) {
      width: auto;
    }
    &-title {
      color: #ef476f;
      letter-spacing: 2px;
    }
  }
  .getstarted {
    a {
      background-color: #118ab2;
      padding: 20px;
      border-radius: 50px;
      display: inline-flex;
      margin-top: 10px;
    }

    span {
      color: #fff;
    }
  }
`;

const Home = props => (
  <StyledContainer>
    <Title>
      <span className="title-color">Productivity</span> at another level
    </Title>
    <div className="desc">
      <strong className="desc-title">Kanricho</strong> is a task management tool
      that helps you staying on top of your goals, projects and daily tasks.
    </div>
    <div className="getstarted">
      <Link href="/signup">
        <a>
          <span className="getstarted_btn">Get Started</span>
        </a>
      </Link>
    </div>
  </StyledContainer>
);

export default Home;
