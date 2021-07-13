import { timeForToday } from "../lib/functions";
import { colors } from "../lib/style";

export const NotiBlock = ({ message, createdAt, nickname }) => {
  return (
    <div
      style={{
        padding: "15px",
        paddingTop: "15px",
        paddingBottom: "15px",
        //margin: "5px",

        //borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
        //borderRadius: "5px",
      }}
    >
      <div>
        <span style={{ color: colors.softViolet, fontWeight: "700" }}>
          {nickname}
        </span>
        {message}
      </div>
      <div style={{ width: "100%", textAlign: "end" }}>
        {timeForToday(createdAt)}
      </div>
    </div>
  );
};
