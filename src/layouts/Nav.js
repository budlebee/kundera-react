import Cookies from "universal-cookie";

import { colors } from "../lib/style";
import { SettingIcon } from "../components/Icons";
import MainLogo from "../assets/MainLogo.png";

import { Link } from "react-router-dom";

export const Nav = () => {
  const cookies = new Cookies();
  const loginCheck = cookies.get("user-id");
  return (
    <header
      style={{
        // safari 에선 position 과 top 설정을 안해야 된다.
        //position: "fixed",
        //WebkitPosition: "static",
        //top: "0px",
        backgroundColor: colors.background,
        borderBottom: `1px solid ${colors.border}`,
        width: "100%",

        // safari 랑 이게 다르네..
        //flex: "1",
        //justifyContent: "center",
      }}
    >
      <div style={{ display: "grid", placeItems: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "600px",
          }}
        >
          <div style={{ padding: "15px" }}>
            <Link to="/">
              <img src={MainLogo} style={{ height: "20px" }} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
