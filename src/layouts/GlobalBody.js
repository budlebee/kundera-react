import styled from "styled-components";

export const GlobalBody = ({ children }) => {
  return (
    <>
      <BodyWrapper
        style={{
          //display: "grid",
          //placeItems: "center",
          display: "flex",
          flex: "1 0 0px",
          justifyContent: "center",
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
  margin-left: 25vw;
  margin-right: 25vw;
  @media (max-width: 1024px) {
    margin-left: 15vw;
    margin-right: 15vw;
  }
  @media (max-width: 768px) {
    margin-left: 10vw;
    margin-right: 10vw;
  }
  @media (max-width: "600px") {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;
