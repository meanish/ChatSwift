import styled from "styled-components";

export const GetStartedStyle = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Gudea:400,700);

  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  .get-started {
    position: relative;
    min-height: 500px;
    border-radius: 28px;
    width: 30%;
    text-align: center;
    border-top: 6px solid ${({ theme }) => theme.colors.bluetheme};
    color: ${({ theme }) => theme.colors.bluetheme};
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    background-image: ${({ theme }) => theme.bg.backgroundimage};
    padding-top: 5%;

    .title {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Gudea", sans-serif;
      margin: 0 0.5rem;
    }
    .search_user {
      margin-top: 4rem;
      color: ${({ theme }) => theme.colors.bluetheme};
    }
    .tips {
      font-size: 13px;
      position: absolute;
      bottom: 25px;
      left: 20px;
      span {
        color: ${({ theme }) => theme.colors.eye};
        font-size: 13px;
      }
    }
    .user_result {
      
    }
  }
`;
