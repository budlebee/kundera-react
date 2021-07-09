import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";

import { Redirect, Link } from "react-router-dom";
import { logout } from "../redux/user";

import { DefaultButton } from "../components/Buttons";
import { colors } from "../lib/style";

export const Setting = () => {
  const dispatch = useDispatch();

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/signup" />;
  }
  return (
    <div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          border: `1px solid ${colors.border}`,
          backgroundColor: "#ffffff",
          width: "auto",
        }}
      >
        <div>프로필 수정</div>
        <div>문의하기</div>
        <div>
          <Link to="/guest">
            <button
              style={{
                all: "unset",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(logout());
              }}
            >
              로그아웃
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
