import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { CheckNoti } from "../redux/user";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { NotiBlock } from "../components/NotiBlock";

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
          });
          console.log(res.data);
          setNotiList(res.data.result);
        } catch (e) {
          console.log("error: ", e);
        }
      };
      readNotis();
    }
  }, [userId]);

  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/signup" />;
  }

  return (
    <>
      {notiList.map((ele, idx) => {
        return (
          <div key={idx}>
            <Link to={`/user-feed/${ele.sender_id}`}>
              <NotiBlock message={ele.message} createdAt={ele.created_at} />
            </Link>
          </div>
        );
      })}
    </>
  );
  // 여기선 남의 noti 보면 안되니까, myId 변수랑 param 값이 일치하는지 체크하고 다르면 홈화면으로 리다이렉션
};
