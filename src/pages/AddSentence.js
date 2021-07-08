import axios from "axios";
import React from "react";
import styled from "styled-components";
import { testId } from "../lib/test";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";
import { colors } from "../lib/style";

export const AddSentence = () => {
  const [bodyText, setBodyText] = React.useState("");
  const [checkValue, setCheckValue] = React.useState("");

  const { loading, error, myId } = useSelector((state) => {
    return {
      loading: state.user.loading,
      error: state.user.error,
      myId: state.user.myId,
    };
  });

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <div>
        <textarea
          value={bodyText}
          style={{
            height: "500px",
            padding: "10px",
            width: "400px",
            resize: "none",
            outline: "none",
            backgroundColor: "#ffffff",
            border: `1px solid ${colors.border}`,
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
          }}
          onChange={(e) => {
            setBodyText(e.target.value);
          }}
          placeholder="갖고 있는 문장을 어딘가로 띄워보내요"
          minlength="1"
          maxlength="1000"
          autoFocus="false"
          spellCheck="false"
        />

        <br />
        <div>
          <button
            onClick={async () => {
              const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_URL}/add-sentence`,
                data: {
                  content: bodyText,
                  userId: `${myId}`,
                },
              });
              console.log(res.data);
              setCheckValue(res.data.text);
            }}
          >
            submit
          </button>
        </div>
      </div>
      <div>{checkValue}</div>
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
