import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { CheckNoti } from "../redux/user";

import { Redirect } from "react-router";
import { NotiBlock } from "../components/NotiBlock";
import { borderRadius } from "../lib/style";

export const Notis = ({ match }) => {
  const { userId } = match.params;
  const { error, myId } = useSelector((state) => {
    return {
      error: state.user.error,
      myId: state.user.myId,
    };
  });
  const [notiList, setNotiList] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    window.localStorage.removeItem("has-noti");
    CheckNoti();
    if (cookies.get("user-id") == userId) {
      const readNotis = async () => {
        try {
          //setLoading(true);
          const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/get-notis`,
            data: { myId: `${userId}` },
            withCredentials: true,
          });

          setNotiList(res.data.result);
        } catch (e) {
          console.log("error: ", e);
        }
      };
      readNotis();
    }
  }, [userId]);

  if (!cookies.get("user-id")) {
    return <Redirect to="/signup" />;
  }

  return (
    <div
      style={{ backgroundColor: "#fff", borderRadius: borderRadius.default }}
    >
      {notiList.length < 1 ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          지금은 알림이 없어요
        </div>
      ) : (
        ""
      )}
      {notiList.map((ele, idx) => {
        return (
          <div key={idx}>
            <NotiBlock
              senderId={ele.sender_id}
              nickname={ele.nickname}
              message={ele.message}
              createdAt={ele.created_at}
              notiType={ele.type}
              postId={ele.post_id}
            />
          </div>
        );
      })}
    </div>
  );
  // 여기선 남의 noti 보면 안되니까, myId 변수랑 param 값이 일치하는지 체크하고 다르면 홈화면으로 리다이렉션
};
