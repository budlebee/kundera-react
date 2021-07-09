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
        padding: "15px",
        marginTop: "15px",
        marginBottom: "15px",

        border: `1px solid ${colors.border}`,
        backgroundColor: "#ffffff",
      }}
    >
      <div>{content}</div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          style={{ color: "0000000", fontWeight: "700" }}
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
