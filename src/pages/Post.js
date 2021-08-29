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

export const Post = ({ match }) => {
  const { postId } = match.params;
  const [postList, setPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });

  useEffect(() => {
    //if (cookies.get("user-id")) {
    const readPosts = async () => {
      try {
        setLoading(true);
        const res = await axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER_URL}/get-certain-post`,
          data: { postId: `${postId}`, myId },
          withCredentials: true,
        });

        setPostList(res.data.posts);
      } catch (e) {
        Swal.fire(e.response.data.message);
        setError(true);
        console.log("error: ", e.response.data.message);
      }
      setLoading(false);
    };
    readPosts();
    //}
  }, [postId, myId, error]);

  const cookies = new Cookies();
  if (!cookies.get("user-id")) {
    //return <Redirect to="/signup" />;
  }

  if (error) {
    return <Redirect to="/" />;
  }

  return (
    <>
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
              commentUnfold={true}
            ></SentenceCard>
          </div>
        );
      })}
    </>
  );
};
