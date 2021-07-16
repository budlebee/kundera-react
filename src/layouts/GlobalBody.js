import styled from "styled-components";
import { boxShadow } from "../lib/style";

export const GlobalBody = ({ children }) => {
  return (
    <>
      <BodyWrapper
        style={{
          display: "grid",
          placeItems: "center",
          backgroundColor: "#fff",
          //boxShadow: boxShadow.default,
          //paddingLeft: "15px",
          //paddingRight: "15px",
          //alignItems: "center",
          //display: "flex",
          //flex: "1 0 0px",
          //justifyContent: "center",
        }}
      >
        {children}
      </BodyWrapper>
    </>
  );
};

const BodyWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 60px;
  margin-left: 35vw;
  margin-right: 35vw;
  width: 30vw;

  @media (max-width: 1024px) {
    margin-left: 25vw;
    margin-right: 25vw;
    width: 50vw;
  }
  @media (max-width: 768px) {
    margin-left: 20vw;
    margin-right: 20vw;
    width: 60vw;
  }
  @media (max-width: 600px) {
    width: 96vw;
    margin-left: 2vw;
    margin-right: 2vw;
  }
`;
