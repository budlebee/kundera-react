import Cookies from "universal-cookie";

import { BlackBellIcon, RedRingingBellIcon } from "../components/Icons";
import MainLogo from "../assets/MainLogo.png";

import { Link } from "react-router-dom";

export const Nav = () => {
  const cookies = new Cookies();
  const loginCheck = cookies.get("user-id");
  return (
    <header
      style={{
        position: "fixed",
        top: "0px",
        backgroundColor: "#fff",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <img src={MainLogo} style={{ height: "60px" }} />
      </Link>
      <button
        style={{
          border: "none",
          padding: "8px",
          backgroundColor: "transparent",
        }}
      >
        <BlackBellIcon width="30px" height="30px" />
        {loginCheck ? (
          <div>로그인 아이디: {loginCheck}</div>
        ) : (
          <div>로그인 아님</div>
        )}
      </button>
    </header>
  );
};
