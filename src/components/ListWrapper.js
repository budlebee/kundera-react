import { colors } from "../lib/style";
export const ListWrapper = ({ children }) => {
  return (
    <div
      style={{
        //boxSizing: "border-box",
        //height: "500px",
        padding: "20px",
        paddingTop: "30px",
        paddingBottom: "30px",
        width: "320px",
        display: "grid",
        gap: "20px",
        placeItems: "center",
        border: `1px solid ${colors.border}`,
        backgroundColor: "#ffffff",
        //width: "100%",
      }}
    >
      {children}
    </div>
  );
};
