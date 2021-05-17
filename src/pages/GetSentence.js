import { SentenceCard } from "../components/SentenceCard";
import { testSentences } from "../lib/test";

import axios from "axios";
import React from "react";

export const GetSentence = () => {
  const [sentences, setSentences] = React.useState(testSentences);
  const [count, setCount] = React.useState(0);
  return (
    <>
      <div>
        문장 랜덤하게(사실은 인기순이지만) 보기. 나중에는 공통 취향에 따라
        나타나는 문장이 달라지면 재밌겠다.
      </div>
      <div>
        <SentenceCard>{sentences[count].sentence}</SentenceCard>
      </div>
      <button
        onClick={() => {
          if (count === sentences.length - 1) {
            alert("문장이 바닥났어요");
          } else {
            setCount(count + 1);
          }
          // 여기서 남은 문장이 0개면 서버에 요청날리고, 로딩비슷하게 "새로운 문장이 떠내려오고 있어요 이런 문구 적자."
          // 그래서 또 10개 보충하고 그런식으로.
          // 처음에는 귀찮으니 걍 개별로 날리자.
        }}
      >
        보관하기
      </button>
      <button
        onClick={async () => {
          const res = await axios({
            method: "get",
            url: "http://localhost:8000",
          });
          console.log(res.data);
        }}
      >
        새로운 문장 찾기
      </button>
    </>
  );
};
