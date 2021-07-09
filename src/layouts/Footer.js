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
  SettingIcon,
  QuestionCircle,
} from "../components/Icons";

export const Footer = () => {
  const cookies = new Cookies();
  const { error, myId } = useSelector((state) => {
    return {
      error: state.user.error,
      myId: state.user.myId,
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
        display: "grid",
        placeItems: "center",
      }}
    >
      <ResponsibleWrapper
        style={{ display: "flex", justifyContent: "center", fontSize: "12px" }}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Link to="/">
            <QuestionCircle height="20" width="20" />
          </Link>
          <div>Find</div>
        </div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Link to={`/gurus-feed/${myId}`}>
            <RippleIcon height="20" width="20" />
          </Link>
          <div>Feed</div>
        </div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Link to="/add">
            <SquarePlusIcon height="20" width="20" />
          </Link>
          <div>Add</div>
        </div>
        {/*<div
            style={{
              display: "grid",
              placeItems: "center",
              width: "100%",
              margin: "10px",
            }}
          >
            <Link to={`/notification/${myId}`}>
              <BlackBellIcon height="20" width="20" />
            </Link>
            <div>Alert</div>
          </div>*/}

        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Link to={`/user-feed/${myId}`}>
            <BookmarkIcon height="20" width="20" />
          </Link>
          <div>My</div>
        </div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Link to={`/setting`}>
            <SettingIcon height="20" width="20" />
          </Link>
          <div>Setting</div>
        </div>
      </ResponsibleWrapper>
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
