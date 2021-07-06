import { testId } from "../lib/test";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import { BookmarkIcon, SquarePlusIcon, RippleIcon } from "../components/Icons";

export const Footer = () => {
  const cookies = new Cookies();
  const [myId, setMyId] = useState(cookies.get("user-id"));
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
          <Link to={`/user-feed/${myId}`}>
            <BookmarkIcon height="30" width="30" />
          </Link>
          <div>My</div>
        </div>
      </div>
    </footer>
  );
};
