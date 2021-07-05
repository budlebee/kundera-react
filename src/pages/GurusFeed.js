import { useState, useEffect } from "react";
import axios from "axios";

import { HorizontalLine } from "../components/Lines";
import { SentenceCard } from "../components/SentenceCard";
import { testId } from "../lib/test";

export const GurusFeed = () => {
  const [userId, setUserId] = useState(testId);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const readPosts = async () => {
      const res = await axios({
        method: "post",
        url: `http://localhost:8000/gurus-feed`,
        data: { userId },
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
  }, []);
  return (
    <>
      <div>자신이 팔로우하는 사람들의 문장을 모아볼 수 있는 피드.</div>
      {postList.map((ele) => {
        return (
          <>
            <HorizontalLine />
            <SentenceCard>
              <div>{ele.content}</div>
              <div>{ele.timestamp}</div>
            </SentenceCard>
          </>
        );
      })}
    </>
  );
};
