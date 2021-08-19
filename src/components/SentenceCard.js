import { Link } from "react-router-dom";
import {
  borderRadius,
  boxShadow,
  colors,
  fontWeight,
  padding,
} from "../lib/style";
import { timeForToday } from "../lib/functions";
import {
  BookmarkIcon,
  BookmarkFilledIcon,
  CommentIcon,
  ThreeDots,
  HeartFilledIcon,
  HeartEmptyIcon,
} from "./Icons";
import { DefaultButton } from "./Buttons";
import { useEffect, useState } from "react";
import { HorizontalLine } from "./Lines";
import axios from "axios";
import { useSelector } from "react-redux";
import { FormInput, StyledTextArea } from "./Inputs";
import { nativeTouchData } from "react-dom/cjs/react-dom-test-utils.production.min";
import Swal from "sweetalert2";

export const SentenceCard = ({
  children,
  keeperNickname,
  keeperId,
  nickname,
  content,
  userId,
  timestamp,
  wasLove,
  postId,
  commentUnfold,
  comments,
}) => {
  const [loved, setLoved] = useState(wasLove);
  const [comment, setComment] = useState("");
  const [onComment, setOnComment] = useState(commentUnfold);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
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

  const noCommentDefault = "지금은 코멘트가 없어요 :)";
  useEffect(() => {
    if (typeof comments != "undefined") {
      if (comments.length > 0) {
        setCommentList(comments);
      }
    }
  }, [commentList]);

  useEffect(() => {
    if (!commentUnfold) {
      setOnComment(false);
    } else {
      const getComments = async () => {
        try {
          setCommentLoading(true);
          const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/get-comments`,
            data: { postId: `${postId}` },
            withCredentials: true,
          });

          setCommentList(res.data.result);
        } catch (e) {
          Swal.fire(e.response.data.message);
          //setError(true);
          console.log("error: ", e.response.data.message);
        }
        setCommentLoading(false);
      };
      getComments();
    }
  }, [postId, commentUnfold]);

  return (
    <div
      style={{
        //padding: "10px",
        paddingLeft: padding.default,
        paddingRight: padding.default,
        paddingTop: padding.default,
        paddingBottom: padding.default,
        //paddingTop: "30px",
        //paddingBottom: "30px",
        marginTop: "15px",
        marginBottom: "15px",
        borderRadius: borderRadius.default,
        border: `1px solid ${colors.border}`,
        backgroundColor: "#ffffff",
        //boxShadow: boxShadow.default,
      }}
    >
      {keeperId ? (
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
                fontWeight: fontWeight.semiBold,
                color: colors.softViolet,
              }}
              to={`/user-feed/${keeperId}`}
            >
              {keeperNickname}
            </Link>
          </div>
          <div>
            {""}
            {/* <ThreeDots height="22" width="22" />*/}
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius.default,
          paddingLeft: padding.default,
          paddingRight: padding.default,
          paddingTop: padding.default,
          paddingBottom: padding.default,
        }}
      >
        <div style={{ lineHeight: "1.5", fontSize: "16px" }}>{content}</div>
        {userId && userId != keeperId ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "7px",
              marginBottom: "7px",
            }}
          >
            <div>
              {""}
              {/* <ThreeDots height="22" width="22" />*/}
            </div>
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
          </div>
        ) : (
          ""
        )}

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
                      { nickname: "", content: noCommentDefault },
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
                <HeartFilledIcon width="22" height="22" />
              ) : (
                <HeartEmptyIcon width="22" height="22" />
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
                          createdBy: userId,
                        },
                        withCredentials: true,
                      });

                      setCommentList([
                        ...commentList.filter((ele) => {
                          if (
                            ele.content != noCommentDefault &&
                            ele.nickname != ""
                          ) {
                            return true;
                          }
                        }),
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
      </div>
    </div>
  );
};
