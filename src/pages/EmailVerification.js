// 해당 페이지에 접속하면 자동적으로 email verify 에 요청을 보냄.
// 요청이 제대로 처리됐으면 5초후 홈화면으로 redirec.

import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";

export const EmailVerification = ({ match }) => {
  const { key } = match.params;
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirection, setRedirection] = useState(false);
  useEffect(() => {
    const checkEmail = async () => {
      setLoading(true);
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/verify-email`,
        data: {
          key: key,
        },
      });
      setResult(res.data.result);
      setLoading(false);
    };
    checkEmail();
  }, []);
  useEffect(() => {
    if (result) {
      setTimeout(() => {
        setRedirection(true);
      }, 3000);
    }
  }, [result]);
  if (redirection) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ textAlign: "center" }}>
      {loading ? "로딩중" : ""}
      {result && !loading ? (
        <div>이메일이 인증됐습니다! 잠시 뒤 홈 화면으로 이동합니다.</div>
      ) : (
        ""
      )}
      {!result && !loading ? (
        <div>
          오류가 발생했습니다. <br />
          오류가 반복된다면 <br />
          budlebeee@gmail.com <br />
          으로 연락주시면 해결하겠습니다.
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
