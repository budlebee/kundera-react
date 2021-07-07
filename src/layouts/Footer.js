import { testId } from "../lib/test";
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
        display: "grid",
        placeItems: "center",
        width: "100%",
        position: "fixed",
        bottom: "0",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <Link to="/">
            <RippleIcon height="30" width="30" />
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
            <RippleIcon height="30" width="30" />
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
            <SquarePlusIcon height="30" width="30" />
          </Link>
          <div>Add</div>
        </div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <Link to={`/notification/${myId}`}>
            <BlackBellIcon height="30" width="30" />
          </Link>
          <div>Alert</div>
        </div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <Link to={`/user-feed/${myId}`}>
            <BookmarkIcon height="30" width="30" />
          </Link>
          <div>My</div>
        </div>
      </div>
    </footer>
  );
};
