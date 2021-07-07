import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

import { Redirect } from "react-router";
import { HorizontalLine } from "../components/Lines";
import { SentenceCard } from "../components/SentenceCard";
import { testGuruId, testMyId } from "../lib/test";
import Skeleton from "react-loading-skeleton";

// params 에 유저 id 를 집어넣고, 그 id 에 따라서 요청 보내게끔.
export const UserFeed = ({ match }) => {
  //const [userId, setUserId] = useState(testId);
  const { userId } = match.params;
  const [loading, setLoading] = useState(false);
  const [isGuru, setIsGuru] = useState(false);
  const { error, myId } = useSelector((state) => {
    return {
      error: state.user.error,
      myId: state.user.myId,
    };
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const readPosts = async () => {
      try {
        //setLoading(true);
        const res = await axios({
          method: "post",
          url: `http://localhost:8000/user-feed`,
          data: { userId: `${userId}`, myId: `${myId}` },
        });
        console.log(
          res.data.result.sort(function (x, y) {
            return -new Date(x.timestamp) + new Date(y.timestamp);
          })
        );

        console.log(res.data);
        //setLoading(false);
        setIsGuru(res.data.isGuru);
        setPostList(res.data.result);
      } catch (e) {
        console.log("error: ", e);
        setLoading(false);
      }
    };
    readPosts();
  }, [userId, myId]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div>갈무리한 문장들을 모아볼 수 있는 피드.</div>
      <div>
        <span>사용자 아이콘</span>
        <span>사용자 닉네임</span>
        <span>
          {myId != userId ? (
            <div>
              {isGuru ? (
                <button
                  onClick={async () => {
                    console.log("unfollow");
                    const res = await axios({
                      method: "post",
                      url: `${process.env.REACT_APP_SERVER_URL}/unfollow`,
                      data: { userId: `${myId}`, guruId: `${userId}` },
                    });
                    setIsGuru(res.data.isGuru);
                    console.log(res.data);
                  }}
                >
                  당신은 이분을 팔로우 중입니다.
                </button>
              ) : (
                <button
                  onClick={async () => {
                    console.log("follow");
                    const res = await axios({
                      method: "post",
                      url: `http://localhost:8000/follow`,
                      data: { userId: `${myId}`, guruId: `${userId}` },
                    });
                    setIsGuru(res.data.isGuru);
                  }}
                >
                  팔로우 하실건가요?
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </span>
      </div>
      {loading ? <Skeleton count={5} /> : ""}
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
