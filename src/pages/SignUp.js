import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/user";

import Cookies from "universal-cookie";

import { Redirect, Link } from "react-router-dom";

export const SignUp = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  const [emailCode, setEmailCode] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailVerificationButtonDisable, setEmailVerificationButtonDisable] =
    useState(false);

  const cookies = new Cookies();
  if (cookies.get("user-id")) {
    console.log("이미 로그인상태에요");
    return <Redirect to="/" />;
  }

  // 정규식을 통해 email 제대로 된건지 체크하고, 제대로 된 이메일이어야지 인증번호 발송 활성화.
  // 이메일 발송버튼은 5초에 한번씩만 활성화.
  return (
    <>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>회원가입</div>
        <input
          placeholder="로그인용 email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        ></input>
        <input
          placeholder="비밀번호. 8~30자. 영어랑 숫자 조합 포함돼야함."
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        ></input>
        <input
          placeholder="비밀번호 확인"
          value={pwdCheck}
          onChange={(e) => {
            setPwdCheck(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            axios({
              method: "post",
              url: "http://localhost:8000/email-verification",
              data: {
                email: email,
              },
            });
          }}
        >
          이메일 인증코드 발송
        </button>
        <input
          placeholder="이메일 인증코드"
          value={emailCode}
          onChange={(e) => {
            setEmailCode(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            dispatch(
              signUp(
                email,
                nickname,
                pwd,
                window.localStorage.getItem("tempLove")
              )
            );
          }}
        >
          submit
        </button>
        <Link to="/login">이미 회원이신가요? 로그인</Link>
      </div>
    </>
  );
};
