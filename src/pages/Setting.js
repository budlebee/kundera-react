import Cookies from "universal-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "../css/slider.css";
import { Redirect, Link } from "react-router-dom";
import { logout, changeProfile, changeNickname } from "../redux/user";

import AppStoreWhite from "../assets/AppStoreWhite.svg";
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
  const [onChangeAlert, setOnChangeAlert] = useState(false);
  const [weeklyCheck, setWeeklyCheck] = useState(false);
  const [snsCheck, setSnsCheck] = useState(false);

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
        <div
          style={{
            width: "100%",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >
          <a href="https://apps.apple.com/kr/app/%EC%BF%A4%EB%8D%B0%EB%9D%BC/id1579221671">
            <img src={AppStoreWhite} />
          </a>
        </div>
        <div style={{ width: "100%" }}>
          <button
            className="retroVioletButton"
            style={{
              //all: "unset",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              setOnChangeSetting(!onChangeSetting);
            }}
          >
            ????????? ??????
          </button>
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
              ??? ?????????
              <FormInput
                value={myNickname}
                onChange={(e) => {
                  dispatch(changeNickname(e.target.value));
                }}
                placeholder="??? ?????????"
              />
            </div>
            <div>
              ??? ?????????
              <FormInput
                value={myProfile}
                onChange={(e) => {
                  dispatch(changeProfile(e.target.value));
                }}
                placeholder="??? ?????????"
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
                  ????????????
                </FormButton>
              </div>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <FormButton
                  onClick={async () => {
                    try {
                      setOnChangeSetting(false);
                      Swal.fire("???????????? ??????????????????");
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
                  ????????????
                </FormButton>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <button
            className="retroGreenButton"
            style={{
              //all: "unset",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={async () => {
              if (!onChangeAlert) {
                // fetch ?????? ????????? ?????? ????????? db?????? ??????????????????.
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/take-email-setting`,
                  data: {
                    userId: myId,
                  },
                  withCredentials: true,
                });
                setWeeklyCheck(res.data.weekly);
                setSnsCheck(res.data.sns);
              }
              setOnChangeAlert(!onChangeAlert);
            }}
          >
            ????????? ?????? ??????
          </button>
        </div>
        {onChangeAlert ? (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              gap: "20px",
              paddingTop: "20px",
              paddingBottom: "10px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
              }}
            >
              <div>????????? ?????? ??????</div>
              <div>
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={weeklyCheck}
                    onChange={(e) => {
                      setWeeklyCheck(!weeklyCheck);
                    }}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
              }}
            >
              <div>???????????? ?????? ??????</div>
              <div>
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={snsCheck}
                    onChange={(e) => {
                      setSnsCheck(!snsCheck);
                    }}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <FormButton
                  style={{ backgroundColor: "#999" }}
                  onClick={() => {
                    setOnChangeAlert(false);
                  }}
                >
                  ????????????
                </FormButton>
              </div>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <FormButton
                  onClick={async () => {
                    try {
                      setOnChangeAlert(false);
                      await axios({
                        method: "post",
                        url: `${process.env.REACT_APP_SERVER_URL}/update-email-setting`,
                        data: {
                          userId: myId,
                          weekly: weeklyCheck,
                          sns: snsCheck,
                        },
                        withCredentials: true,
                      });
                      Swal.fire("??????????????? ??????????????????.");
                    } catch (e) {
                      console.log("error: ", e);
                      Swal.fire(e.response.data.message);
                    }
                    //const res = await axios({
                    //  method: "post",
                    //  url: `${process.env.REACT_APP_SERVER_URL}/update-setting`,
                    //  data: {
                    //    userId: myId,
                    //    nickname: myNickname,
                    //    profile: myProfile,
                    //  },
                    //  withCredentials: true,
                    //});
                  }}
                  disabled={!myNickname}
                >
                  ????????????
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
          <button
            className="retro-button-yellow"
            style={{
              //all: "unset",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              setOnContact(!onContact);
            }}
          >
            ??????
          </button>
        </div>
        {onContact ? (
          <div style={{ display: "grid", placeItems: "center" }}>
            <div>budlebeee@gmail.com</div>
            <div>??????</div>
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
          <button
            className="retro-button-red"
            style={{
              //all: "unset",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              dispatch(logout());
            }}
          >
            ????????????
          </button>
        </Link>
      </div>
    </ListWrapper>
  );
};
