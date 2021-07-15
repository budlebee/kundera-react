import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import { SettingIcon } from "../components/Icons";
import { Redirect } from "react-router";
import { DefaultButton } from "../components/Buttons";
import { HorizontalLine } from "../components/Lines";
import { SentenceCard } from "../components/SentenceCard";
import { testGuruId, testMyId } from "../lib/test";
import Skeleton from "react-loading-skeleton";
import { colors } from "../lib/style";

// params 에 유저 id 를 집어넣고, 그 id 에 따라서 요청 보내게끔.
export const UserFeed = ({ match }) => {
  //const [userId, setUserId] = useState(testId);
  const { userId } = match.params;
  const [loading, setLoading] = useState(false);
  const [isGuru, setIsGuru] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [error, setError] = useState(false);
  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  const [postList, setPostList] = useState([]);
  const [guruList, setGuruList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    if (cookies.get("user-id")) {
      const readPosts = async () => {
        try {
          //setLoading(true);
          const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/user-feed`,
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
          setUserNickname(res.data.userNickname);
          setUserProfile(res.data.userProfile);
        } catch (e) {
          Swal.fire(e.response.data.message);
          setError(true);
          console.log("error: ", e.response.data.message);
        }
      };
      readPosts();
    }
  }, [userId, myId, error]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    console.log("로그인이 필요해요");
    return <Redirect to="/signup" />;
  }

  if (error) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="profile-block">
        <div
          className="profile-buttons"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span>{userNickname}</span>

            <span>
              {myId != userId ? (
                <>
                  {isGuru ? (
                    <DefaultButton
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
                      팔로우 중
                    </DefaultButton>
                  ) : (
                    <DefaultButton
                      style={{
                        backgroundColor: colors.softViolet,
                        color: "#eee",
                      }}
                      onClick={async () => {
                        console.log("follow");
                        const res = await axios({
                          method: "post",
                          url: `${process.env.REACT_APP_SERVER_URL}/follow`,
                          data: { userId: `${myId}`, guruId: `${userId}` },
                        });
                        setIsGuru(res.data.isGuru);
                      }}
                    >
                      팔로우 하기
                    </DefaultButton>
                  )}
                </>
              ) : (
                ""
              )}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DefaultButton
              onClick={async () => {
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/get-followers`,
                  data: { userId: `${userId}` },
                });
                console.log(res.data.result);
                setFollowerList(res.data.result);
              }}
            >
              팔로워
            </DefaultButton>
            <DefaultButton
              onClick={async () => {
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/get-gurus`,
                  data: { userId: `${userId}` },
                });
                console.log(res.data.result);
                setGuruList(res.data.result);
              }}
            >
              팔로우
            </DefaultButton>
            {myId == userId ? (
              <span>
                {" "}
                <Link to={`/setting`}>
                  <SettingIcon height="20" width="20" />
                </Link>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>{userProfile}</div>
      </div>
      <div></div>
      {loading ? <Skeleton count={5} /> : ""}
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
