import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { HorizontalLine } from "../components/Lines";
import { SentenceCard } from "../components/SentenceCard";
import { testGuruId, testMyId } from "../lib/test";

// params 에 유저 id 를 집어넣고, 그 id 에 따라서 요청 보내게끔.
export const UserFeed = ({ match }) => {
  //const [userId, setUserId] = useState(testId);
  const { userId } = match.params || "1";
  const { loading, error, myId } = useSelector((state) => {
    return {
      loading: state.user.loading,
      error: state.user.error,
      myId: state.user.myId,
    };
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const readPosts = async () => {
      const res = await axios({
        method: "post",
        url: `http://localhost:8000/user-feed`,
        data: { userId, myId },
      });
      console.log(
        res.data.result.sort(function (x, y) {
          return -new Date(x.timestamp) + new Date(y.timestamp);
        })
      );
      // post 뿐만 아니라, 이사람과 내가 팔로우 관계인지 아닌지 체크해야되니까 followers 확인도 해야되네.
      // api 를 따로 구성할까? 아님 하나에서 전부 처리할까? 하나에서 하자.
      console.log(res.data.result);
      setPostList(res.data.result);
      // res.data.isFollowing 값을 return 에 넣으면 되지.
      //setPost(res.data.result[0]);
    };
    readPosts();
  }, []);
  return (
    <>
      <div>갈무리한 문장들을 모아볼 수 있는 피드.</div>
      <div>
        <span>사용자 아이콘</span>
        <span>사용자 닉네임</span>
        <span>
          <button
            onClick={async () => {
              const res = await axios({
                method: "post",
                url: `http://localhost:8000/follow`,
                data: { userId: testMyId, guruId: testGuruId },
              });
            }}
          >
            팔로우 버튼. myId와 userId 가 같다면 나타나지 않음.
          </button>
        </span>
      </div>
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
