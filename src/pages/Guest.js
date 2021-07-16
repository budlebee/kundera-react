// 사용자가 접속했는데 로그인이 안된상태면 모두 Guest 페이지로 보내버린다.

// Guest 와 Home 거의 비슷.

// guest 상태에서 갈무리한 문장들은 로컬 스토리지에 저장되고, 이 사람이 회원가입을 하거나 로그인을 하면
// 갈무리 했던 문장들을 love-sentence 로 보낸다.

// love sentence 도 여러개의 문장을 처리할 수 있게 살짝 조정해야겠네.

// 문장찾기가 바로 시작됨. 보관하기 클릭하면 로그인이 필요하다는 팝업이 뜸

import { testSentences, testId } from "../lib/test";
import Cookies from "universal-cookie";
import { saveLoveIdForGuest } from "../redux/user";

import { SentenceCard } from "../components/SentenceCard";
import Swal from "sweetalert2";
import { DefaultButton } from "../components/Buttons";
import { RedFireIcon, ArrowRight } from "../components/Icons";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { colors } from "../lib/style";
import { HorizontalLine } from "../components/Lines";

export const Guest = () => {
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState(null);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = useState(false);

  const readPosts = useCallback(async () => {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/guest-get-sentence`,
      data: {},
    });
    console.log(res.data.result);
    setPostList(res.data.result);
    setPost(res.data.result[0]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // cookie 체크하고 없다면 redirection.
    setLoading(true);

    readPosts();
  }, []);

  const cookies = new Cookies();
  if (cookies.get("user-id")) {
    console.log("로그인 했으면 게스트 페이지로는 올 필요 없지.");
    return <Redirect to="/" />;
  }

  if (loading) {
    return <></>;
  }

  return (
    <>
      {postList.length < 1 ? (
        <div
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <div>지금은 떠다니는 문장이 없어요. </div>
          <div>
            문장을{" "}
            <Link
              style={{ fontWeight: 700, color: colors.softViolet }}
              to="/add"
            >
              직접 추가해
            </Link>{" "}
            볼 수 있어요!
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", placeItems: "center" }}>
          <div style={{ textAlign: "center", padding: "15px" }}>
            영감을 주는 문장을 발견하고
            <br />
            공유할 수 있는 곳 이에요.
          </div>
          <HorizontalLine />
          <div>
            {post ? <SentenceCard content={post.content}></SentenceCard> : ""}
          </div>
          <div>
            <DefaultButton
              onClick={async () => {
                // 여기서 임시 좋아요들을 보관하고 리덕스 메모리에 보관하고 있다가,
                // 사용자가 회원가입을 한다면 임시 저장소들을 전부 love-sentence 로 보내버리자.
                // 딱 하나만 보관하기 눌러도 회원가입 강제할 거니까 기존 api 활용할 수 있어.
                // 회원가입 팝업 띄우고, 팝업 클릭하면 회원가입 링크로 보내자.
                // sweetalert2 쓰자.
                Swal.fire({
                  title: "문장을 모아보세요!",
                  text: "문장을 공유하고 멋진 취향의 사람들을 팔로우할 수 있어요",

                  confirmButtonText: `가입해볼래요`,
                  showCancelButton: true,
                  cancelButtonText: "괜찮아요.",
                  //confirmButtonText: '<a href="/signup"></a> 가입해볼래요!',
                  //cancelButtonText: "괜찮아요",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // 여기서 redux 에다가 임시저장 추가한다.
                    // 걍 로컬스토리지 쓰자.
                    window.localStorage.setItem("tempLove", post.id);
                    window.location.href = "/signup";
                    //return <Redirect to="/signup" />;
                  }
                });
              }}
            >
              <div>
                <RedFireIcon height="30" width="30" />
              </div>
              <div>보관하기</div>
            </DefaultButton>
            <DefaultButton
              onClick={async () => {
                // 무덤덤 애들도 보관을 하고 반영을 할까? 고민되네.
                // 처음엔 문장갯수도 그리 많지 않을테니 그냥 두자.
                if (count === postList.length - 1) {
                  readPosts();
                  setCount(0);
                  //setPostList([]);
                  //alert("문장이 바닥났어요");
                  return;
                } else {
                  setPost(postList[count + 1]);
                  setCount(count + 1);
                }
              }}
            >
              <div>
                <ArrowRight height="30" width="30" />
              </div>
              <div>넘어가기</div>
            </DefaultButton>
          </div>
        </div>
      )}
    </>
  );
};
