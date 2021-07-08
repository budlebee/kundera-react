import { testId } from "../lib/test";

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
      }}
    >
      <div style={{ display: "grid", placeItems: "center" }}>
        <div style={{ display: "flex", width: "500px" }}>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: "100%",
              margin: "10px",
            }}
          >
            <Link to="/">
              <RippleIcon height="20" width="20" />
            </Link>
            <div>Sail</div>
          </div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: "100%",
              margin: "10px",
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
            }}
          >
            <Link to={`/setting`}>
              <SettingIcon height="20" width="20" />
            </Link>
            <div>Setting</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
