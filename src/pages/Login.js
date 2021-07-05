import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <>
      <div>회원가입</div>
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
        onClick={async () => {
          const res = await axios({
            method: "post",
            url: "http://localhost:8000/login",
            data: { email, pwd },
          });
          console.log(res.data);
        }}
      >
        로그인
      </button>
    </>
  );
};
