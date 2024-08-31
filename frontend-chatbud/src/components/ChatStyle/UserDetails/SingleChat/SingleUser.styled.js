import styled from "styled-components";

export const SingleUserStyle = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
  .user_detailing {
    padding: 2rem;
    text-align:start;
    background-color: ${({ theme }) => theme.colors.lightBackground};
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    margin: 2rem auto;
    max-width: 400px;

    .head {
      color: ${({ theme }) => theme.colors.bluetheme};
      padding: 1rem 0;
      font-size: 24px;
      font-weight: bold;
    }

    .user_name {
      margin: 1.5rem 0;
      font-size: 20px;
      font-weight: 500;

      .detail {
        font-size: 24px;
        font-weight: bolder;
color:#4274C9;
      }

      .name-highlight {
        background-color: ${({ theme }) => theme.colors.highlight};
        padding: 0.2rem 0.5rem;
        border-radius: 5px;
      }
    }
  }
`;
