import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user";
import Cookies from "universal-cookie";
import "../css/button.css";

import { Redirect, Link } from "react-router-dom";
import { ListWrapper } from "../components/ListWrapper";
import { colors } from "../lib/style";
import { FormInput } from "../components/Inputs";
import { FormButton } from "../components/Buttons";

export const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const { loading } = useSelector((state) => {
    return {
      loading: state.user.loading,
    };
  });

  const cookies = new Cookies();
  if (cookies.get("user-id")) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <ListWrapper>
        <div>로그인</div>
        <FormInput
          placeholder="로그인 email"
          value={email}
          minLength="1"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <FormInput
          type="password"
          placeholder="비밀번호"
          value={pwd}
          minLength="8"
          maxLength="30"
          required
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />

        <button
          className="retroVioletButton"
          disabled={!(!loading && email.length > 0 && pwd.length > 0)}
          onClick={() => {
            dispatch(login(email, pwd));
            // res.data에 담긴 access token 을 redux 에 담아놓고.
            // refresh cookie 를 설정하고.
          }}
        >
          로그인
        </button>
        <Link to="/signup">
          아직 회원이 아니신가요?{" "}
          <span style={{ color: colors.softViolet }}>회원가입</span>
        </Link>
      </ListWrapper>
    </>
  );
};
