import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export const Notis = ({ match }) => {
  const { userId } = match.params;
  const { error, myId } = useSelector((state) => {
    return {
      error: state.user.error,
      myId: state.user.myId,
    };
  });

  const cookies = new Cookies();
  console.log(userId);
  console.log(cookies.get("user-id"));
  useEffect(() => {
    // 여기서 유저의 has_notis 정보도 가져와서, noti 가 있다면 redux state를 바꾸고, 아이콘 빨갛게 바꿔줘야해.

    if (cookies.get("user-id") == userId) {
      console.log("dd");
      const readNotis = async () => {
        try {
          //setLoading(true);
          const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/get-notis`,
            data: { myId: `${userId}` },
          });
          console.log(res.data);
        } catch (e) {
          console.log("error: ", e);
        }
      };
      readNotis();
    }
  }, [userId]);

  return <>뭐임 왜안됨?</>;
  // 여기선 남의 noti 보면 안되니까, myId 변수랑 param 값이 일치하는지 체크하고 다르면 홈화면으로 리다이렉션
};
