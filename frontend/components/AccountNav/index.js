import React from "react";
import User from "../User";
import Signout from "../Signout";
import Link from "next/link";
import styled from "styled-components";
import ClickOutside from "../ClickOutside";

const StyledIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #073b4c;
  font-size: 14px;
  font-weight: 600;
  color: white;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-shrink: 0;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  line-height: 30px;
  text-transform: uppercase;
  border-radius: 100%;
  cursor: pointer;
`;

const StyledAccountMenu = styled.div`
  position: absolute;
  border: 1px solid #d9e3ed;
  font-size: 14px;
  box-shadow: 0 3px 3px rgba(12, 52, 75, 0.05);
  border-radius: 6px;
  padding: 10px;
  background: #fff;
  margin-top: 10px;
  text-align: center;
  right: 0;
  z-index: 1;
  .account-menu {
    display: flex;
    flex-direction: column;
    p,
    button,
    a {
      font-weight: 600;
      font-size: 14px;
      line-height: 36px;
      display: block;
      padding: 0px 10px;
      border-radius: 6px;
      margin: 2px 0px;
      text-align: left;
      border: none;
    }
    button {
      background-color: transparent;
      cursor: pointer;
    }
  }
  .account-arrow {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 0;
    top: -10px;
    svg {
      transform: rotate(90deg);
      fill: white;
    }
  }
`;

class AccountNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      <>
        <div style={{ justifySelf: "center" }}>
          <User>
            {({ data: { me } }) => {
              if (me) {
                return (
                  <div style={{ position: "relative" }}>
                    <StyledIcon
                      onClick={e => {
                        this.handleClick();
                        e.stopPropagation();
                      }}
                    >
                      {me.name.substring(0, 1)}
                    </StyledIcon>
                    <ClickOutside handleClickOutside={this.handleClick}>
                      {this.state.isOpen && (
                        <StyledAccountMenu>
                          <div className="account-arrow">
                            <svg viewBox="0 0 30 30">
                              <path
                                className="pt-popover-arrow-border"
                                d="M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z"
                              ></path>
                              <path
                                className="pt-popover-arrow-fill"
                                d="M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z"
                              ></path>
                            </svg>
                          </div>
                          <div className="account-menu">
                            <p>{me.email}</p>

                            <Link href="/dashboard">
                              <a>
                                <span>Dashboard</span>
                              </a>
                            </Link>
                            <Signout />
                          </div>
                        </StyledAccountMenu>
                      )}
                    </ClickOutside>
                  </div>
                );
              }
              return null;
            }}
          </User>
        </div>
      </>
    );
  }
}

export default AccountNav;
