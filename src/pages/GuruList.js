import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { NotiBlock } from "../components/NotiBlock";
import { ShortProfileBlock } from "../components/ShortProfileBlock";
import { BackButton } from "../components/Buttons";

export const GuruList = ({ match, history }) => {
  const { userId } = match.params;
  const [guruList, setGuruList] = useState([]);
  const { error, myId } = useSelector((state) => {
    return {
      error: state.user.error,
      myId: state.user.myId,
    };
  });
  const cookies = new Cookies();

  useEffect(() => {
    const getFollowers = async () => {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/get-gurus`,
        data: { userId: `${userId}` },
      });
      setGuruList(res.data.result);
    };
    getFollowers();
  }, [userId]);

  if (!cookies.get("user-id")) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <BackButton
        onClick={() => {
          history.goBack(1);
        }}
      >
        뒤로가기
      </BackButton>
      {guruList.length < 1 ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          지금은 팔로우 하는 사람이 없어요
        </div>
      ) : (
        ""
      )}
      {guruList.map((ele, idx) => {
        return (
          <div key={idx}>
            <Link to={`/user-feed/${ele.user_id}`}>
              <ShortProfileBlock
                nickname={ele.nickname}
                profile={ele.profile}
                userId={ele.user_id}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
  // 여기선 남의 noti 보면 안되니까, myId 변수랑 param 값이 일치하는지 체크하고 다르면 홈화면으로 리다이렉션
};
