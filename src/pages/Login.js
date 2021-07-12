import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import Cookies from "universal-cookie";

import { Redirect, Link } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const cookies = new Cookies();
  if (cookies.get("user-id")) {
    console.log("이미 로그인상태에요");
    return <Redirect to="/" />;
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>로그인</div>
        <input
          placeholder="로그인 email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <input
          placeholder="비밀번호."
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        ></input>

        <button
          onClick={() => {
            dispatch(login(email, pwd));
            // res.data에 담긴 access token 을 redux 에 담아놓고.
            // refresh cookie 를 설정하고.
          }}
        >
          로그인
        </button>
        <Link to="/signup">계정이 없으신가요? 회원가입하기</Link>
      </div>
    </>
  );
};
