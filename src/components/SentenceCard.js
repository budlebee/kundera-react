import { Link } from "react-router-dom";
export const SentenceCard = ({
  children,
  nickname,
  content,
  userId,
  timestamp,
}) => {
  return (
    <div style={{ padding: "15px" }}>
      <div>{content}</div>
      <Link to={`/user-feed/${userId}`}>{nickname}</Link>
      <div>{timestamp}</div>
    </div>
  );
};
