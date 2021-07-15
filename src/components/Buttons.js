import styled from "styled-components";
import { colors } from "../lib/style";
import { ArrowLeft } from "./Icons";

export const DefaultButton = styled.button`
  font-size: 12px;
  font-weight: 700;
  padding: 5px;
  margin: 5px;
  background-color: #ffffff;
  color: #333;
  border: 1px solid ${colors.border};
  border-radius: 5px;
`;

export const BackButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <ArrowLeft width="15" height="15" />
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
  height: 40px;
  // outline: 0;
  text-align: center;
  width: 100%;
  &:disabled {
    background-color: #999;
    cursor: default;
  }
`;
