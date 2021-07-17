import Cookies from "universal-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Redirect, Link } from "react-router-dom";
import { logout, changeProfile, changeNickname } from "../redux/user";

import { ListWrapper } from "../components/ListWrapper";
import { FormInput } from "../components/Inputs";
import { DefaultButton, FormButton } from "../components/Buttons";
import { colors } from "../lib/style";
import { InstaIcon } from "../components/Icons";
import Swal from "sweetalert2";
import { ToS } from "../components/ToS";

export const Setting = () => {
  const dispatch = useDispatch();
  const [onContact, setOnContact] = useState(false);
  const [onChangeSetting, setOnChangeSetting] = useState(false);

  const { myNickname, myProfile, myId } = useSelector((state) => {
    return {
      myNickname: state.user.myNickname,
      myProfile: state.user.myProfile,
      myId: state.user.myId,
    };
  });

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    return <Redirect to="/signup" />;
  }
  return (
    <ListWrapper>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <FormButton
            style={{
              //all: "unset",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              setOnChangeSetting(!onChangeSetting);
            }}
          >
            프로필 수정
          </FormButton>
        </div>
        {onChangeSetting ? (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              gap: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div>
              새 닉네임
              <FormInput
                value={myNickname}
                onChange={(e) => {
                  dispatch(changeNickname(e.target.value));
                }}
                placeholder="새 닉네임"
              />
            </div>
            <div>
              새 프로필
              <FormInput
                value={myProfile}
                onChange={(e) => {
                  dispatch(changeProfile(e.target.value));
                }}
                placeholder="새 프로필"
              />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <FormButton
                  style={{ backgroundColor: "#999" }}
                  onClick={() => {
                    setOnChangeSetting(false);
                  }}
                >
                  취소하기
                </FormButton>
              </div>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <FormButton
                  onClick={async () => {
                    try {
                      setOnChangeSetting(false);
                      Swal.fire("프로필이 수정됐습니다");
                    } catch (e) {
                      console.log("error: ", e);
                      Swal.fire(e.response.data.message);
                    }
                    const res = await axios({
                      method: "post",
                      url: `${process.env.REACT_APP_SERVER_URL}/update-setting`,
                      data: {
                        userId: myId,
                        nickname: myNickname,
                        profile: myProfile,
                      },
                      withCredentials: true,
                    });
                  }}
                  disabled={!myNickname}
                >
                  수정완료
                </FormButton>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div style={{ display: "grid", placeItems: "center", width: "100%" }}>
        <div
          style={{
            width: "100%",
            paddingTop: "10px",
            paddingBottom: "10px",
            lineHeight: 2,
          }}
        >
          <FormButton
            style={{
              //all: "unset",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              setOnContact(!onContact);
            }}
          >
            문의
          </FormButton>
        </div>
        {onContact ? (
          <div style={{ display: "grid", placeItems: "center" }}>
            <div>budlebeee@gmail.com</div>
            <div>또는</div>
            <div>
              <a href="https://www.instagram.com/kundera_so/" target="_blank">
                <InstaIcon width="25" height="25" />
              </a>
            </div>
            <ToS />
          </div>
        ) : (
          ""
        )}
      </div>
      <div style={{ width: "100%" }}>
        <Link
          style={{
            all: "unset",
            cursor: "pointer",
            width: "100%",
          }}
          to="/guest"
        >
          <FormButton
            style={{
              //all: "unset",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              dispatch(logout());
            }}
          >
            로그아웃
          </FormButton>
        </Link>
      </div>
    </ListWrapper>
  );
};
