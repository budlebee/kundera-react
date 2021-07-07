import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

import { Redirect } from "react-router";
import { HorizontalLine } from "../components/Lines";
import { SentenceCard } from "../components/SentenceCard";
import { testId } from "../lib/test";

export const GurusFeed = () => {
  const [userId, setUserId] = useState(testId);
  const [postList, setPostList] = useState([]);

  const [cookieCheck, setCookieCheck] = useState(false);
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
        url: `http://localhost:8000/gurus-feed`,
        data: { myId: `${myId}` },
      });
      console.log(
        res.data.result.sort(function (x, y) {
          return -new Date(x.timestamp) + new Date(y.timestamp);
        })
      );
      setPostList(res.data.result);
      //setPost(res.data.result[0]);
    };
    readPosts();
  }, [myId]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div>자신이 팔로우하는 사람들의 문장을 모아볼 수 있는 피드.</div>
      {postList.map((ele, idx) => {
        return (
          <div key={idx}>
            <HorizontalLine />
            <SentenceCard
              content={ele.content}
              nickname={ele.nickname}
              userId={ele.created_by}
              timestamp={ele.timestamp}
            ></SentenceCard>
          </div>
        );
      })}
    </>
  );
};
