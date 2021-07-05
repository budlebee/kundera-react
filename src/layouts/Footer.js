import { BookmarkIcon, SquarePlusIcon, RippleIcon } from "../components/Icons";
import { Link } from "react-router-dom";

import { testId } from "../lib/test";

export const Footer = () => {
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
          <Link to={`/gurus-feed/${testId}`}>
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
          <Link to={`/user-feed/${testId}`}>
            <BookmarkIcon height="30" width="30" />
          </Link>
          <div>My</div>
        </div>
      </div>
    </footer>
  );
};
