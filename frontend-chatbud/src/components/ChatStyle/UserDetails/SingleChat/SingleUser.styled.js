import styled from "styled-components";

export const SingleUserStyle = styled.div`
  .user_details {
    padding: 1rem;
    text-align: center;

    .head {
      color: ${({ theme }) => theme.colors.bluetheme};
      padding: 2rem 0;
    }
    .user_name {
      margin: 1rem 0;
      .detail {
        font-size: 15px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.eye};
      }
    }
  }
`;
