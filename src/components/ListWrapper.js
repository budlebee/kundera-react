import { boxShadow, colors } from "../lib/style";
import styled from "styled-components";

export const ListWrapper = styled.div`
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  display: grid;
  gap: 15px;
  place-items: center;
  grid-template-columns: 1fr;
  //border: 1px solid ${colors.border};
  //box-shadow: ${boxShadow.default};
  background-color: #ffffff;
  //min-width: 400px;
  //width: 100%;
  margin: auto;

  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 600px) {
    //  min-width: 250px;
  }
`;
