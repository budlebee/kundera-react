import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";
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
    if (cookies.get("user-id")) {
      const readPosts = async () => {
        setLoading(true);
        const res = await axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER_URL}/gurus-feed`,
          data: { myId: `${myId}` },
          withCredentials: true,
        });
        console.log(res.data);
        setPostList(res.data.result);
        //setPost(res.data.result[0]);
        setLoading(false);
      };
      readPosts();
    }
  }, [myId]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    return <Redirect to="/signup" />;
  }
  if (loading) {
    return <></>;
  }
  // 사용자의 피드 밑에는 랜덤 피드를 뿌려주자.
  return (
    <div>
      {postList.length == 0 ? (
        <div style={{ textAlign: "center" }}>지금은 팔로우 게시글이 없어요</div>
      ) : (
        ""
      )}
      {postList.map((ele, idx) => {
        return (
          <div key={idx}>
            <SentenceCard
              content={ele.content}
              keeperId={ele.keeper_id}
              keeperNickname={ele.keeper_nickname}
              nickname={ele.nickname}
              userId={ele.created_by}
              timestamp={ele.timestamp}
              wasLove={ele.wasLove}
              postId={ele.post_id}
            ></SentenceCard>
          </div>
        );
      })}
    </div>
  );
};
