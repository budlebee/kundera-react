import { ToS } from "../components/ToS";
import { longToS } from "../lib/constants";

export const Support = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        margin: "auto",
      }}
    >
      <div>이용약관</div>
      <br />
      <br />
      <div>{longToS}</div>
      <br />
      <br />
    </div>
  );
};
