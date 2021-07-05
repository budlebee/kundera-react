import axios from "axios";
import React from "react";
import styled from "styled-components";
import { testId } from "../lib/test";

export const AddSentence = () => {
  const [bodyText, setBodyText] = React.useState("");
  const [checkValue, setCheckValue] = React.useState("");
  return (
    <>
      <div>
        <TextareaWrapper>
          <textarea
            value={bodyText}
            style={{
              height: "90%",
              padding: "10px",
              width: "95%",
              resize: "none",
              outline: "none",
              border: "none",
            }}
            onChange={(e) => {
              setBodyText(e.target.value);
            }}
            placeholder="갖고 있는 문장을 어딘가로 띄워보내요"
            minlength="1"
            maxlength="1000"
            autoFocus="false"
            spellcheck="false"
          />
        </TextareaWrapper>
        <br />
        <div>
          <button
            onClick={async () => {
              const res = await axios({
                method: "post",
                url: "http://localhost:8000/add-sentence",
                data: {
                  content: bodyText,
                  userId: testId,
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
