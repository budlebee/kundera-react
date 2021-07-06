import { SentenceCard } from "../components/SentenceCard";
import { testSentences, testId } from "../lib/test";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const GetSentence = () => {
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState(null);
  const [count, setCount] = React.useState(0);

  const { loading, error, myId } = useSelector((state) => {
    return {
      loading: state.user.loading,
      error: state.user.error,
      myId: state.user.myId,
    };
  });

  useEffect(() => {
    const readPosts = async () => {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/get-sentence`,
        data: { userId: myId },
      });
      console.log(res.data.result);
      setPostList(res.data.result);
      setPost(res.data.result[0]);
    };
    readPosts();
  }, []);

  return (
    <>
      <div></div>
      <div>
        {post ? <SentenceCard content={post.content}></SentenceCard> : ""}
      </div>
      <button
        onClick={async () => {
          console.log(post.id);
          const res = await axios({
            method: "post",
            url: "http://localhost:8000/love-sentence",
            data: { userId: myId, postId: `${post.id}` },
          });
          console.log(res.data);
          if (count === postList.length - 1) {
            alert("문장이 바닥났어요");
          } else {
            setPost(postList[count + 1]);
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
          console.log(post.id);
          const res = await axios({
            method: "post",
            url: "http://localhost:8000/hate-sentence",
            data: { userId: myId, postId: `${post.id}` },
          });
          if (count === postList.length - 1) {
            alert("문장이 바닥났어요");
            return;
          } else {
            setPost(postList[count + 1]);
            setCount(count + 1);
          }
        }}
      >
        새로운 문장 찾기
      </button>
      <button
        onClick={async () => {
          const res = await axios({
            method: "post",
            url: "http://localhost:8000/get-sentence",
            data: { email: "bbogle7613@gmail.com", tempKey: "asdf" },
          });
          console.log(res.data);
        }}
      >
        임시 테스트용
      </button>
    </>
  );
};
