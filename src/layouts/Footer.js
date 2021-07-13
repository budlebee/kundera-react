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
        backgroundColor: colors.background,
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "12px",
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            display: "grid",
            textAlign: "center",
            //justifyContent: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <div>
            <Link to="/">
              <SearchIcon height="20" width="20" />
            </Link>
          </div>
          <div>Find</div>
        </div>
        <div
          style={{
            display: "grid",
            textAlign: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <div>
            <Link to={`/gurus-feed/${myId}`}>
              <RippleIcon height="20" width="20" />
            </Link>
          </div>
          <div>Feed</div>
        </div>
        <div
          style={{
            display: "grid",
            textAlign: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <div>
            <Link to="/add">
              <SquarePlusIcon height="20" width="20" />
            </Link>
          </div>
          <div>Add</div>
        </div>
        <div
          style={{
            display: "grid",
            textAlign: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <div>
            <Link to={`/noti/${myId}`}>
              {hasNoti ? (
                <RedRingingBellIcon height="20" width="20" />
              ) : (
                <BlackBellIcon height="20" width="20" />
              )}
            </Link>
          </div>
          <div>Alert</div>
        </div>

        <div
          style={{
            display: "grid",
            textAlign: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <div>
            <Link to={`/user-feed/${myId}`}>
              <BookmarkIcon height="20" width="20" />
            </Link>
          </div>
          <div>My</div>
        </div>
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
