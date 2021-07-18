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
  const [error, setError] = useState(false);
  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  const [postList, setPostList] = useState([]);
  const [guruList, setGuruList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (cookies.get("user-id")) {
      const readPosts = async () => {
        try {
          //setLoading(true);
          const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/user-feed`,
            data: { userId: `${userId}`, myId: `${myId}` },
            withCredentials: true,
          });

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
    return <Redirect to="/signup" />;
  }

  if (error) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="profile-block" style={{ padding: "15px" }}>
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
      </div>

      <HorizontalLine />

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
