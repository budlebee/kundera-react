import { Link } from "react-router-dom";
import { colors } from "../lib/style";
import { timeForToday } from "../lib/functions";

export const SentenceCard = ({
  children,
  nickname,
  content,
  userId,
  timestamp,
}) => {
  return (
    <div
      style={{
        padding: "20px",
        paddingTop: "30px",
        paddingBottom: "30px",
        marginTop: "15px",
        marginBottom: "15px",
        borderRadius: "2px",
        border: `1px solid ${colors.border}`,
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ lineHeight: "1.5", fontSize: "16px" }}>{content}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "7px",
        }}
      >
        <Link
          style={{ color: "#000000", fontWeight: "700" }}
          to={`/user-feed/${userId}`}
        >
          {nickname}
        </Link>
      </div>
      {/* 초창기에는 ~일전, ~시간전 이런 문구 추가하지 말자. 간격이 너무 길면 유령사이트 같아보여.
      <div>{timeForToday(timestamp)}</div>
      */}
    </div>
  );
};
