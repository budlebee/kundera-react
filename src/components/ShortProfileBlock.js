import { boxShadow, colors } from "../lib/style";

export const ShortProfileBlock = ({ nickname, userId, profile }) => {
  // 프로필은 앞의 몇글자만 잘라서 보여주자.
  return (
    <div
      style={{
        backgroundColor: "#fff",

        margin: "5px",
        padding: "10px",
        //border: `1px solid ${colors.border}`,
        //boxShadow: boxShadow.default,
      }}
    >
      <div>{nickname}</div>
      <div>{profile}</div>
    </div>
  );
};
