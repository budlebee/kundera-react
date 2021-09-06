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
import { Redirect } from "react-router";
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
  const [localContent, setLocalContent] = useState(content);
  const [comment, setComment] = useState("");
  const [onComment, setOnComment] = useState(commentUnfold);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const { myId } = useSelector((state) => {
    return {
      myId: state.user.myId,
    };
  });
  useEffect(() => {
    setLoved(wasLove);
  }, [wasLove]);
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

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

  //if (onSubmit) {
  //   return <Redirect to={`/post/${postId}`}></Redirect>;
  //}

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
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
                    color: colors.violet,
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
        </div>

        <div>
          {userId == myId && myId && userId ? (
            <DefaultButton
              onClick={() => {
                setOnUpdate(!onUpdate);
                setEditedText(localContent);
              }}
              style={{ padding: "2 2 2 2", margin: "0 0 0 0" }}
            >
              {onUpdate ? "취소" : "수정하기"}
            </DefaultButton>
          ) : (
            ""
          )}
        </div>
      </div>
      {onUpdate ? (
        <div
          style={{ display: "grid", placeItems: "center", textAlign: "center" }}
        >
          <div>
            <textarea
              value={editedText}
              cols="30"
              style={{
                height: "350px",
                padding: "20px",
                fontSize: "14px",
                lineHeight: "1.5",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
                //border: `1px solid ${colors.border}`,
                //boxShadow: boxShadow.default,
                border: "none",
                borderRadius: borderRadius.default,
                fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
              }}
              onChange={(e) => {
                setEditedText(e.target.value);
              }}
              placeholder="갖고 있는 문장을 어딘가로 띄워보낼 수 있어요. 명언도 좋고, 책에서 읽은 문장도 좋고, 자신의 생각을 담은 통찰을 띄워보내도 좋아요. "
              minLength="1"
              maxLength="1000"
              autoFocus={false}
              spellCheck="false"
            />
          </div>

          <div style={{ padding: "10px" }}>
            <button
              className="retroVioletButton"
              onClick={async () => {
                try {
                  setLoading(true);
                  const res = await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}/update-sentence`,
                    data: {
                      content: editedText,
                      userId: `${myId}`,
                      postId: postId,
                    },
                    withCredentials: true,
                  });

                  //setCheckValue(res.data.text);
                  setLoading(false);
                  setOnUpdate(false);
                  setOnSubmit(true);
                  setLocalContent(editedText);
                } catch (e) {
                  alert("죄송합니다. 에러가 발생했어요");
                }
              }}
            >
              <div style={{ fontSize: "16px" }}>수정완료</div>
            </button>
          </div>
        </div>
      ) : (
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
          <div style={{ lineHeight: "1.5", fontSize: "16px" }}>
            {localContent}
          </div>
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
                    color: colors.violet,
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
                            color: colors.violet,
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
      )}
    </div>
  );
};
