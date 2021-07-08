import styled from "styled-components";

export const GlobalBody = ({ children }) => {
  return (
    <>
      <BodyWrapper
        style={{
          display: "flex",
          flex: "1 0 0px",
          //placeItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </BodyWrapper>
    </>
  );
};

const BodyWrapper = styled.div`
  margin-left: 25vw;
  margin-right: 25vw;
  padding-top: 20px;
  padding-bottom: 60px;
  @media (max-width: 1024px) {
    margin-left: 15vw;
    margin-right: 15vw;
  }
  @media (max-width: 768px) {
    margin-left: 10vw;
    margin-right: 10vw;
  }
  @media (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
  }
`;
