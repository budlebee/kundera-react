import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import "../css/button.css";
import "../css/slider.css";

import { Link } from "react-router-dom";
import { HeartFilledIcon, SettingIcon } from "../components/Icons";
import { Redirect } from "react-router";
import {
  BorderButton,
  DefaultButton,
  RetroButton,
} from "../components/Buttons";
import { HorizontalLine } from "../components/Lines";
import { SentenceCard } from "../components/SentenceCard";
import { testGuruId, testMyId } from "../lib/test";
import Skeleton from "react-loading-skeleton";
import { colors } from "../lib/style";
import { ListWrapper } from "../components/ListWrapper";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// params 에 유저 id 를 집어넣고, 그 id 에 따라서 요청 보내게끔.
export const UserFeed = ({ match }) => {
  //const [userId, setUserId] = useState(testId);
  const { userId } = match.params;
  const [loading, setLoading] = useState(false);
  const [isGuru, setIsGuru] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [heartCount, setHeartCount] = useState("");
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [onMyPost, setOnMyPost] = useState(false);
  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  const [postList, setPostList] = useState([]);
  const [tempPostList, setTempPostList] = useState([]);
  const [guruList, setGuruList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    //if (cookies.get("user-id")) {
    const readPosts = async () => {
      try {
        //setLoading(true);
        const res = await axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER_URL}/user-feed`,
          data: { userId: `${userId}`, myId: `${myId}` },
          withCredentials: true,
        });
        const sortedList = res.data.result.sort((a, b) => {
          if (Date.parse(a.added_at) > Date.parse(b.added_at)) {
            return -1;
          } else {
            return 1;
          }
        });
        //setLoading(false);
        setIsGuru(res.data.isGuru);
        setHeartCount(res.data.heartCount);
        setPostList(sortedList);
        setTempPostList(sortedList);
        setUserNickname(res.data.userNickname);
        setUserProfile(res.data.userProfile);
      } catch (e) {
        Swal.fire(e.response.data.message);
        setError(true);
        console.log("error: ", e.response.data.message);
      }
    };
    readPosts();
    //};
  }, [userId, myId, error]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    //return <Redirect to="/signup" />;
  }
  if (redirect) {
    return <Redirect to="/signup" />;
  }

  if (error) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div
        className="profile-block"
        style={{ backgroundColor: "#fff", padding: "15px" }}
      >
        <div
          className="profile-buttons"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontWeight: "700",
                fontSize: "16px",
                color: colors.violet,
              }}
            >
              {userNickname}
              {"  "}
              <HeartFilledIcon width="14" height="14" />
              {heartCount}
            </span>

            <span>
              {myId != userId ? (
                <>
                  {isGuru ? (
                    <DefaultButton
                      onClick={async () => {
                        const res = await axios({
                          method: "post",
                          url: `${process.env.REACT_APP_SERVER_URL}/unfollow`,
                          data: { userId: `${myId}`, guruId: `${userId}` },
                          withCredentials: true,
                        });
                        setIsGuru(res.data.isGuru);
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
                        if (!cookies.get("user-id")) {
                          setRedirect(true);
                          return;
                        }
                        const res = await axios({
                          method: "post",
                          url: `${process.env.REACT_APP_SERVER_URL}/follow`,
                          data: { userId: `${myId}`, guruId: `${userId}` },
                          withCredentials: true,
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
            <Link to={`/followers/${userId}`}>
              <DefaultButton onClick={async () => {}}>팔로워</DefaultButton>
            </Link>
            <Link to={`/gurus/${userId}`}>
              <DefaultButton onClick={async () => {}}>팔로잉</DefaultButton>
            </Link>
            {myId == userId ? (
              <span>
                <Link to={`/setting`}>
                  <SettingIcon height="20" width="20" />
                </Link>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div style={{ fontStyle: "italic" }}>{userProfile}</div>
        {myId == userId ? (
          <div
            style={{
              display: "flex",
              paddingTop: "5px",
              justifyContent: "center",
            }}
          >
            <span style={{ width: "100%", textAlign: "center" }}>
              <Link to={`/setting`}>
                <BorderButton style={{ width: "100%", textAlign: "center" }}>
                  프로필 변경
                </BorderButton>
              </Link>
            </span>
            <span style={{ width: "100%", textAlign: "center" }}>
              <Link to={`/my-comments/${myId}`}>
                <BorderButton style={{ width: "100%", textAlign: "center" }}>
                  내가 쓴 댓글
                </BorderButton>
              </Link>
            </span>
          </div>
        ) : (
          ""
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>직접 쓴 글만 모아보기</span>
          <span>
            <label class="switch">
              <input
                type="checkbox"
                checked={onMyPost}
                onChange={(e) => {
                  if (onMyPost) {
                    setPostList(tempPostList);
                  } else {
                    setPostList(
                      postList
                        .filter((ele) => {
                          return ele.created_by == userId;
                        })
                        .sort((a, b) => {
                          if (Date.parse(a.added_at) > Date.parse(b.added_at)) {
                            return -1;
                          } else {
                            return 1;
                          }
                        })
                    );
                  }
                  setOnMyPost(!onMyPost);
                }}
              />
              <span class="slider round"></span>
            </label>
          </span>
        </div>
      </div>

      {loading ? <Skeleton count={5} /> : ""}
      {postList.map((ele, idx) => {
        return (
          <div key={idx}>
            <SentenceCard
              content={ele.content}
              nickname={ele.nickname}
              userId={ele.created_by}
              timestamp={ele.timestamp}
              wasLove={ele.wasLove}
              postId={ele.post_id}
            ></SentenceCard>
          </div>
        );
      })}
    </>
  );
};
