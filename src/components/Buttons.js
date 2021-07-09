import { colors } from "../lib/style";
export const DefaultButton = ({ onClickHandler, children }) => {
  return (
    <button
      style={{
        fontSize: "12px",
        backgroundColor: "#ffffff",
        border: `1px solid ${colors.border}`,
        borderRadius: "5px",
      }}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
