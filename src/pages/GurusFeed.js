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
  const [loading, setLoading] = useState(false);

  const [cookieCheck, setCookieCheck] = useState(false);
  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  useEffect(() => {
    const readPosts = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    readPosts();
  }, [myId]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/signup" />;
  }
  if (loading) {
    return <></>;
  }
  return (
    <>
      <div>Feed</div>
      {postList.map((ele, idx) => {
        return (
          <div key={idx}>
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
