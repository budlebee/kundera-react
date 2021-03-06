import styled from "styled-components";
import { boxShadow, colors } from "../lib/style";
import { ArrowLeft } from "./Icons";
import "../css/button.css";

export const DefaultButton = styled.button`
  font-size: 12px;
  font-weight: 700;
  padding: 5px;
  margin: 10px;
  background-color: #ffffff;
  //box-shadow: ${boxShadow.default};
  color: #333;
  //border: 1px solid ${colors.border};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  &:disabled {
    background-color: #555555;
  }
`;

export const RetroButton = ({ children }) => {
  return (
    <a href="#" class="button nav-link">
      <div class="bottom"></div>

      <div class="top">
        <div class="label">{children}</div>

        <div class="button-border button-border-left"></div>
        <div class="button-border button-border-top"></div>
        <div class="button-border button-border-right"></div>
        <div class="button-border button-border-bottom"></div>
      </div>
    </a>
  );
};

export const BorderButton = styled.button`
  font-size: 12px;
  font-weight: 700;
  padding: 5px;
  margin: 10px;
  background-color: #ffffff;
  //box-shadow: ${boxShadow.default};
  color: #333;
  border: 1px solid ${colors.border};
  cursor: pointer;
  //border: none;
  border-radius: 5px;
  &:disabled {
    background-color: #555555;
  }
`;

export const BackButton = ({ onClick }) => {
  return (
    <button
      style={{
        all: "unset",
        cursor: "pointer",
        width: "100%",
      }}
      onClick={onClick}
    >
      <ArrowLeft width="20" height="20" />
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
  font-size: 16px;
  font-weight: 500;
  box-shadow: ${boxShadow.default};
  height: 40px;
  // outline: 0;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: ${colors.softVioletActive};
  }
  &:disabled {
    background-color: #999;
    cursor: default;
  }
`;
