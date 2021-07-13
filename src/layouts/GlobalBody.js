import styled from "styled-components";

export const GlobalBody = ({ children }) => {
  return (
    <>
      <BodyWrapper
        style={{
          display: "grid",
          placeItems: "center",
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
  padding-top: 20px;
  padding-bottom: 60px;
  margin-left: 35vw;
  margin-right: 35vw;
  width: 30vw;

  @media (max-width: 1024px) {
    margin-left: 30vw;
    margin-right: 30vw;
    width: 40vw;
  }
  @media (max-width: 768px) {
    margin-left: 20vw;
    margin-right: 20vw;
    width: 60vw;
  }
  @media (max-width: 600px) {
    width: 90vw;
    margin-left: 5vw;
    margin-right: 5vw;
  }
`;
