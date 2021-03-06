import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import "../css/button.css";
import { testId } from "../lib/test";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";
import { borderRadius, boxShadow, colors } from "../lib/style";

import { DefaultButton, FormButton } from "../components/Buttons";

export const UpdateSentence = () => {
  const [bodyText, setBodyText] = React.useState("");
  const [checkValue, setCheckValue] = React.useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    return <Redirect to="/signup" />;
  }
  if (submit) {
    return <Redirect to={`/user-feed/${myId}`} />;
  }

  return (
    <>
      <div
        style={{ display: "grid", placeItems: "center", textAlign: "center" }}
      >
        <div>
          <textarea
            value={bodyText}
            cols="30"
            style={{
              height: "350px",
              padding: "20px",
              fontSize: "14px",
              lineHeight: "1.5",
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              //border: `1px solid ${colors.border}`,
              //boxShadow: boxShadow.default,
              border: "none",
              borderRadius: borderRadius.default,
              fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
            }}
            onChange={(e) => {
              setBodyText(e.target.value);
            }}
            placeholder="갖고 있는 문장을 어딘가로 띄워보낼 수 있어요. 명언도 좋고, 책에서 읽은 문장도 좋고, 자신의 생각을 담은 통찰을 띄워보내도 좋아요. "
            minLength="1"
            maxLength="1000"
            autoFocus={false}
            spellCheck="false"
          />
        </div>

        <div style={{ padding: "10px" }}>
          <button
            className="retroVioletButton"
            disabled={!(!loading && bodyText.length > 0)}
            onClick={async () => {
              try {
                setLoading(true);
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/add-sentence`,
                  data: {
                    content: bodyText,
                    userId: `${myId}`,
                  },
                  withCredentials: true,
                });

                //setCheckValue(res.data.text);
                setLoading(false);
                setSubmit(true);
              } catch (e) {
                alert("죄송합니다. 에러가 발생했어요");
              }
            }}
          >
            <div style={{ fontSize: "16px" }}>글쓰기</div>
          </button>
        </div>
      </div>
    </>
  );
};

const TextareaWrapper = styled.div`
  border: 1px solid #999;
  width: 400px;
  height: 50vw;
  @media (max-width: 1024px) {
    width: 400px;
  }
  @media (max-width: 768px) {
    width: 400px;
  }
  @media (max-width: 600px) {
    width: 90vw;
  }
  @media (max-width: 475px) {
    width: 100vw;
    height: 40vw;
  }
`;
