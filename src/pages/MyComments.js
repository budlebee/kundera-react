import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { CheckNoti } from "../redux/user";
import { timeForToday } from "../lib/functions";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { NotiBlock } from "../components/NotiBlock";
import { borderRadius } from "../lib/style";

export const MyComments = ({ match }) => {
  const { userId } = match.params;
  const { error, myId } = useSelector((state) => {
    return {
      error: state.user.error,
      myId: state.user.myId,
    };
  });
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    console.log(userId);
    if (cookies.get("user-id") == userId) {
      const getMyComments = async () => {
        try {
          setLoading(true);
          const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/get-my-comments`,
            data: { myId: `${userId}` },
            withCredentials: true,
          });

          setCommentList(res.data.result);
          console.log(res.data.result);
        } catch (e) {
          console.log("error: ", e);
        }
      };
      setLoading(false);
      getMyComments();
    }
  }, [userId]);

  if (!cookies.get("user-id")) {
    return <Redirect to="/signup" />;
  }

  return (
    <div
      style={{ backgroundColor: "#fff", borderRadius: borderRadius.default }}
    >
      {commentList.length < 1 && !loading ? (
        <div style={{ padding: "20px", display: "grid", placeItems: "center" }}>
          지금은 비어있어요.
        </div>
      ) : (
        ""
      )}
      {commentList.map((ele, idx) => {
        return (
          <div key={idx} style={{ padding: "10px" }}>
            <Link to={`/post/${ele.post_id}`}>
              <div>
                {ele.content.length > 200
                  ? `${ele.content.slice(0, 200)}...`
                  : ele.content}
              </div>
              <div style={{ width: "100%", textAlign: "end" }}>
                {timeForToday(ele.created_at)}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
  // 여기선 남의 noti 보면 안되니까, myId 변수랑 param 값이 일치하는지 체크하고 다르면 홈화면으로 리다이렉션
};
