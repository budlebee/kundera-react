import { testId } from "../lib/test";
import styled from "styled-components";

import { colors } from "../lib/style";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BookmarkIcon,
  SquarePlusIcon,
  RippleIcon,
  BlackBellIcon,
  RedRingingBellIcon,
  SearchIcon,
  SettingIcon,
  QuestionCircle,
} from "../components/Icons";

export const Footer = () => {
  const cookies = new Cookies();
  const { error, myId, hasNoti } = useSelector((state) => {
    return {
      error: state.user.error,
      myId: state.user.myId,
      hasNoti: state.user.hasNoti,
    };
  });

  return (
    <footer
      style={{
        // display: "flex",
        // flext: "1",
        // placeItems: "center",
        borderTop: `1px solid ${colors.border}`,
        width: "100%",
        position: "fixed",
        bottom: "0",
        backgroundColor: "#fff",
        width: "100%",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "8px",
          maxWidth: "600px",
          height: "55px",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <FooterElement>
          <div>
            <Link to="/">
              <SearchIcon height="20" width="20" />
            </Link>
          </div>
          <div>홈</div>
        </FooterElement>
        <FooterElement>
          <div>
            <Link to={`/gurus-feed/${myId}`}>
              <RippleIcon height="20" width="20" />
            </Link>
          </div>
          <div>피드</div>
        </FooterElement>
        <FooterElement>
          <div>
            <Link to="/add">
              <SquarePlusIcon height="20" width="20" />
            </Link>
          </div>
          <div>글쓰기</div>
        </FooterElement>
        <FooterElement>
          <div>
            <Link to={`/noti/${myId}`}>
              {false ? (
                <RedRingingBellIcon height="20" width="20" />
              ) : (
                <BlackBellIcon height="20" width="20" />
              )}
            </Link>
          </div>
          <div>알림</div>
        </FooterElement>

        <FooterElement>
          <div>
            <Link to={`/user-feed/${myId}`}>
              <BookmarkIcon height="20" width="20" />
            </Link>
          </div>
          <div>마이페이지</div>
        </FooterElement>
      </div>
    </footer>
  );
};

const ResponsibleWrapper = styled.div`
  margin-left: 25vw;
  margin-right: 25vw;

  @media (max-width: 1024px) {
    margin-left: 15vw;
    margin-right: 15vw;
  }
  @media (max-width: 768px) {
    margin-left: 10vw;
    margin-right: 10vw;
  }
  @media (max-width: "600px") {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

const FooterElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 13px;
  color: #444444;
  text-decoration: none;
`;
