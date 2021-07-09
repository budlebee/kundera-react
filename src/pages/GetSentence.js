import { SentenceCard } from "../components/SentenceCard";
import { testSentences, testId } from "../lib/test";

import Cookies from "universal-cookie";

import { DefaultButton } from "../components/Buttons";
import { RedFireIcon, ArrowRight } from "../components/Icons";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const GetSentence = () => {
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState(null);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = useState(false);

  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  useEffect(() => {
    // cookie 체크하고 없다면 redirection.
    setLoading(true);
    const readPosts = async () => {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/get-sentence`,
        data: { userId: `${myId}` },
      });
      console.log(res.data.result);
      setPostList(res.data.result);
      setPost(res.data.result[0]);
      setLoading(false);
    };
    readPosts();
  }, [myId]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/guest" />;
  }

  if (loading) {
    return <></>;
  }

  return (
    <>
      {postList.length < 1 ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <div>지금은 떠다니는 문장이 없어요. </div>
          <div>
            문장을{" "}
            <Link style={{ fontWeight: 700 }} to="/add">
              직접 추가해
            </Link>{" "}
            볼 수 있어요!
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", placeItems: "center" }}>
          <div>
            {post ? <SentenceCard content={post.content}></SentenceCard> : ""}
          </div>
          <div>
            <DefaultButton
              onClickHandler={async () => {
                console.log(post.id);
                const res = await axios({
                  method: "post",
                  url: "http://localhost:8000/love-sentence",
                  data: { userId: `${myId}`, postId: `${post.id}` },
                });
                console.log(res.data);
                if (count === postList.length - 1) {
                  setPostList([]);
                  //alert("문장이 바닥났어요");
                } else {
                  setPost(postList[count + 1]);
                  setCount(count + 1);
                }
                // 여기서 남은 문장이 0개면 서버에 요청날리고, 로딩비슷하게 "새로운 문장이 떠내려오고 있어요 이런 문구 적자."
                // 그래서 또 10개 보충하고 그런식으로.
                // 처음에는 귀찮으니 걍 개별로 날리자.
              }}
            >
              <div>
                <RedFireIcon height="30" width="30" />
              </div>
              <div>보관하기</div>
            </DefaultButton>
            <DefaultButton
              onClickHandler={async () => {
                console.log(post.id);
                const res = await axios({
                  method: "post",
                  url: "http://localhost:8000/hate-sentence",
                  data: { userId: `${myId}`, postId: `${post.id}` },
                });
                if (count === postList.length - 1) {
                  setPostList([]);
                  //alert("문장이 바닥났어요");
                  return;
                } else {
                  setPost(postList[count + 1]);
                  setCount(count + 1);
                }
              }}
            >
              <div>
                <ArrowRight height="30" width="30" />
              </div>
              <div>넘어가기</div>
            </DefaultButton>
          </div>
        </div>
      )}
    </>
  );
};
