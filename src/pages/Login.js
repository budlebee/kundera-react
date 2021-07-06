import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";

export const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <>
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
    </>
  );
};
