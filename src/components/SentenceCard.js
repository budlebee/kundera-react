import { Link } from "react-router-dom";
import { colors } from "../lib/style";

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
        margin: "15px",
        border: `1px solid ${colors.border}`,
        backgroundColor: "#ffffff",
      }}
    >
      <div>{content}</div>
      <Link to={`/user-feed/${userId}`}>{nickname}</Link>
      <div>{timestamp}</div>
    </div>
  );
};
