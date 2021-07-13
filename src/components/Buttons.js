import styled from "styled-components";
import { colors } from "../lib/style";
export const DefaultButton = ({ onClickHandler, children }) => {
  return (
    <button
      style={{
        fontSize: "12px",
        padding: "5px",
        margin: "5px",
        backgroundColor: "#ffffff",
        border: `1px solid ${colors.border}`,
        borderRadius: "5px",
        //cursor: "pointer",
        //boxSizing: "border-box",
        //height: "50px",
        //margin-top: 38px;
        //textAlign: "center",
        //width: "100%",
      }}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export const FormButton = styled.button`
  background-color: ${colors.softViolet};
  border-radius: 5px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 40px;
  // outline: 0;
  text-align: center;
  width: 100%;
  &:disabled {
    background-color: #999;
  }
`;
