import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/user";
import Cookies from "universal-cookie";

import { Redirect, Link } from "react-router-dom";
import { ListWrapper } from "../components/ListWrapper";
import { colors } from "../lib/style";
import { FormInput } from "../components/Inputs";
import { FormButton } from "../components/Buttons";
import Swal from "sweetalert2";

export const SignUp = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  const { loading } = useSelector((state) => {
    return {
      loading: state.user.loading,
    };
  });

  const [emailCode, setEmailCode] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailCheckCode, setEmailCheckCode] = useState("");
  const [emailVerificationButtonDisable, setEmailVerificationButtonDisable] =
    useState(false);

  const emailRegex = new RegExp("^[^ ]+@[^ ]+.[a-z]{2,63}$");
  const pwdRegex = new RegExp("^[a-zA-Z0-9]+$");

  const cookies = new Cookies();
  if (cookies.get("user-id")) {
    return <Redirect to="/" />;
  }

  // 정규식을 통해 email 제대로 된건지 체크하고, 제대로 된 이메일이어야지 인증번호 발송 활성화.
  // 이메일 발송버튼은 5초에 한번씩만 활성화.
  return (
    <>
      <ListWrapper>
        <div>회원가입</div>
        <FormInput
          placeholder="닉네임"
          minLength="1"
          maxLength="30"
          required
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <FormInput
          placeholder="로그인용 email"
          type="email"
          minLength="1"
          maxLength="320"
          pattern="^[^ ]+@[^ ]+\.[a-z]{2,63}$"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <FormInput
          placeholder="비밀번호. 8~30자, 영어+숫자"
          type="password"
          pattern="^[a-zA-Z0-9]+$" //숫자와 영문 대소문자만.
          title="비밀번호를 입력해주세요"
          required
          minLength="8"
          maxLength="30"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
        <FormInput
          placeholder="비밀번호 확인"
          type="password"
          minLength="8"
          maxLength="30"
          title="확인을 위해 비밀번호를 다시 한번 입력해주세요"
          required
          value={pwdCheck}
          onChange={(e) => {
            setPwdCheck(e.target.value);
          }}
        />
        {/*
        <FormButton
          onClick={async () => {
            // 생각해보니 email 확인에서 가입했는지를 체크해야 되니까, 이건 서버로 보내야 된다.
            // 서버에서 lambda를 호출해야겠네.
            try {
              const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_MAIL_API}/verify-email`,
                data: {
                  email: email,
                },
              });
              
              //setEmailCheckCode(res.data.message);
            } catch (e) {
              
              Swal.fire(e.response.data.message);
            }
          }}
        >
          이메일 인증코드 발송
        </FormButton>
        <FormInput
          placeholder="이메일 인증코드"
          required
          title="이메일로 발송된 숫자를 입력해주세요"
          minLength="1"
          maxLength="30"
          value={emailCode}
          onChange={(e) => {
            setEmailCode(e.target.value);
          }}
        />*/}

        <FormButton
          disabled={
            !(
              !loading &&
              nickname.length > 0 &&
              email.length > 3 &&
              pwd.length > 7 &&
              pwd == pwdCheck &&
              emailRegex.test(email) &&
              pwdRegex.test(pwd)
            )
          }
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
          회원가입
        </FormButton>
        <Link to="/login">
          이미 회원이신가요?{" "}
          <span style={{ color: colors.softViolet }}>로그인</span>
        </Link>
      </ListWrapper>
    </>
  );
};
