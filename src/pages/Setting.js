import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";

import { Redirect, Link } from "react-router-dom";
import { logout } from "../redux/user";

export const Setting = () => {
  const dispatch = useDispatch();

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div>닉네임 변경하기</div>
      <div>문의하기</div>
      <div>
        <Link to="/guest">
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            로그아웃
          </button>
        </Link>
      </div>
    </>
  );
};
