import { boxShadow, colors } from "../lib/style";

export const ShortProfileBlock = ({ nickname, userId, profile }) => {
  // 프로필은 앞의 몇글자만 잘라서 보여주자.
  return (
    <div
      style={{
        backgroundColor: "#fff",

        margin: "5px",
        padding: "10px",
        //width: "100%",
        border: `1px solid ${colors.border}`,
        //boxShadow: boxShadow.default,
      }}
    >
      <div style={{ color: colors.violet, fontWeight: "700" }}>{nickname}</div>
      <div style={{ fontStyle: "italic" }}>{profile}</div>
    </div>
  );
};
