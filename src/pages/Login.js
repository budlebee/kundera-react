import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import Cookies from "universal-cookie";

import { Redirect, Link } from "react-router-dom";
import { ListWrapper } from "../components/ListWrapper";
import { colors } from "../lib/style";
import { FormInput } from "../components/Inputs";
import { FormButton } from "../components/Buttons";

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

        <FormButton
          disabled={!((email.length > 0) & (pwd.length > 0))}
          onClick={() => {
            dispatch(login(email, pwd));
            // res.data에 담긴 access token 을 redux 에 담아놓고.
            // refresh cookie 를 설정하고.
          }}
        >
          로그인
        </FormButton>
        <Link to="/signup">
          아직 회원이 아니신가요?{" "}
          <span style={{ color: colors.softViolet }}>회원가입</span>
        </Link>
      </ListWrapper>
    </>
  );
};
