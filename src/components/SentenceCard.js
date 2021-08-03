import { Link } from "react-router-dom";
import { boxShadow, colors } from "../lib/style";
import { timeForToday } from "../lib/functions";
import {
  BookmarkIcon,
  BookmarkFilledIcon,
  CommentIcon,
  ThreeDots,
} from "./Icons";
import { DefaultButton } from "./Buttons";
import { useEffect, useState } from "react";
import { HorizontalLine } from "./Lines";
import axios from "axios";
import { useSelector } from "react-redux";
import { FormInput, StyledTextArea } from "./Inputs";
import { nativeTouchData } from "react-dom/cjs/react-dom-test-utils.production.min";

export const SentenceCard = ({
  children,
  nickname,
  content,
  userId,
  timestamp,
  wasLove,
  postId,
}) => {
  const [loved, setLoved] = useState(wasLove);
  const [comment, setComment] = useState("");
  const [onComment, setOnComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });
  const { myNickname } = useSelector((state) => {
    return {
      myNickname: state.user.myNickname,
    };
  });

  useEffect(() => {
    setOnComment(false);
  }, [postId]);

  return (
    <div
      style={{
        padding: "20px",
        paddingTop: "30px",
        paddingBottom: "30px",
        marginTop: "15px",
        marginBottom: "15px",
        borderRadius: "2px",
        //border: `1px solid ${colors.border}`,
        backgroundColor: "#ffffff",
        //boxShadow: boxShadow.default,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "7px",
          marginBottom: "7px",
        }}
      >
        <div>
          <Link
            style={{
              color: "#000000",
              fontWeight: "700",
              color: colors.softViolet,
            }}
            to={`/user-feed/${userId}`}
          >
            {nickname}
          </Link>
        </div>
        <div>
          {""}
          {/* <ThreeDots height="22" width="22" />*/}
        </div>
      </div>
      <div style={{ lineHeight: "1.5", fontSize: "16px" }}>{content}</div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "7px",
        }}
      >
        {postId != null ? (
          <DefaultButton
            onClick={async () => {
              if (!onComment) {
                setLoading(true);
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/get-comments`,
                  data: {
                    postId: postId,
                  },
                  withCredentials: true,
                });
                if (res.data.result.length == 0) {
                  setCommentList([
                    { nickname: "", content: "지금은 코멘트가 없어요 :)" },
                  ]);
                } else {
                  setCommentList(res.data.result);
                }

                setLoading(false);
              }
              setOnComment(!onComment);
            }}
          >
            <CommentIcon width="22" height="22" />
          </DefaultButton>
        ) : (
          ""
        )}

        {wasLove != null && myId != userId ? (
          <DefaultButton
            onClick={async () => {
              if (loved) {
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/delete-love`,
                  withCredentials: true,
                  data: {
                    userId: `${myId}`,
                    postId: postId,
                    createdBy: userId,
                  },
                });
              } else {
                const res = await axios({
                  method: "post",
                  url: `${process.env.REACT_APP_SERVER_URL}/love-sentence`,
                  withCredentials: true,
                  data: {
                    userId: `${myId}`,
                    postId: postId,
                    createdBy: userId,
                  },
                });
              }
              // axios 로 통신 보내고, ok 면 그렇게 한다.
              setLoved(!loved);
            }}
          >
            {loved ? (
              <BookmarkFilledIcon width="22" height="22" />
            ) : (
              <BookmarkIcon width="22" height="22" />
            )}
          </DefaultButton>
        ) : (
          ""
        )}
      </div>
      {/* 초창기에는 ~일전, ~시간전 이런 문구 추가하지 말자. 간격이 너무 길면 유령사이트 같아보여.
      <div>{timeForToday(timestamp)}</div>
      */}
      {onComment ? (
        <div>
          <div>
            {commentList.map((ele) => {
              return (
                <div
                  style={{
                    fontSize: "14px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <span style={{ fontWeight: "700", padding: "5px" }}>
                    <Link
                      style={{
                        color: "#000000",
                        fontWeight: "700",
                        color: colors.softViolet,
                      }}
                      to={`/user-feed/${ele.created_by}`}
                    >
                      {ele.nickname}
                    </Link>
                  </span>
                  <span style={{ padding: "5px" }}>{ele.content}</span>
                </div>
              );
            })}
          </div>
          {myId != null ? (
            <>
              <div>
                <StyledTextArea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder="댓글"
                  style={{ width: "100%", backgroundColor: "#fafafa" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <DefaultButton
                  disabled={loading}
                  onClick={async () => {
                    setLoading(true);
                    const res = await axios({
                      method: "post",
                      url: `${process.env.REACT_APP_SERVER_URL}/add-comment`,
                      data: {
                        content: comment,
                        userId: `${myId}`,
                        postId: postId,
                      },
                      withCredentials: true,
                    });

                    setCommentList([
                      ...commentList,
                      { content: comment, nickname: myNickname },
                    ]);
                    setComment("");

                    setLoading(false);
                  }}
                >
                  댓글달기
                </DefaultButton>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <HorizontalLine />
    </div>
  );
};
