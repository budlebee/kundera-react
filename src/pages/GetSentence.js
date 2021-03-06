import { SentenceCard } from "../components/SentenceCard";
import { testSentences, testId } from "../lib/test";

import Cookies from "universal-cookie";

import { DefaultButton } from "../components/Buttons";
import { RedFireIcon, ArrowRight, HeartFilledIcon } from "../components/Icons";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { colors } from "../lib/style";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GetSentence = () => {
  const notify = () => toast("문장이 마이페이지에 추가됐어요!");
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState(null);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  const readPosts = useCallback(async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/get-sentence`,
        withCredentials: true,
        data: { userId: `${myId}` },
      });

      setPostList(res.data.result);
      setPost(res.data.result[0]);
      setLoading(false);
    } catch (e) {
      console.log("error: ", e);
      setError(true);
    }
  }, [myId]);

  useEffect(() => {
    // cookie 체크하고 없다면 redirection.
    if (cookies.get("user-id")) {
      setLoading(true);
      readPosts();
    }
  }, []);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    return <Redirect to="/guest" />;
  }
  if (error) {
    setError(false);
    return <Redirect to="/signup" />;
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
            <Link
              style={{ fontWeight: 700, color: colors.softViolet }}
              to="/add"
            >
              직접 추가해
            </Link>{" "}
            볼 수 있어요!
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", placeItems: "center" }}>
          <div>
            {post ? (
              <SentenceCard
                content={post.content}
                postId={post.post_id}
                nickname={post.nickname}
                userId={post.created_by}
              ></SentenceCard>
            ) : (
              ""
            )}
          </div>
          <div>
            <DefaultButton
              onClick={async () => {
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/hate-sentence`,
                  withCredentials: true,
                  data: { userId: `${myId}`, postId: `${post.post_id}` },
                });
                if (count === postList.length - 1) {
                  readPosts();
                  setCount(0);
                  //setPostList([]);
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

            <DefaultButton
              onClick={async () => {
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/love-sentence`,
                  withCredentials: true,
                  data: {
                    userId: `${myId}`,
                    postId: `${post.post_id}`,
                    createdBy: post.created_by,
                  },
                });
                // 여기서 배너가 떠야한다.
                notify()
                if (count === postList.length - 1) {
                  readPosts();
                  setCount(0);
                  //setPostList([]);
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
                <HeartFilledIcon height="30" width="30" />
              </div>
              <div>간직하기</div>
            </DefaultButton>
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover />
          </div>
        </div>
      )}
    </>
  );
};
