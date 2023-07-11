import styled from "styled-components";

export const ChatBoxStyle = styled.div`
  color: ${({ theme }) => theme.colors.bluetheme};
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 35px 35px 70px #d9d9d9, -35px -35px 70px #ffffff;
  padding: 1rem 0;
  border: 1px solid orange;
  .chat_head {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .user-name {
    margin: auto;
  }
  .user_detail {
    .box {
      box-shadow: 2px 2px 12px -7px rgb(250, 250, 250);
      border: 2px solid black;
      border-radius: 5px;
      padding: 0.5rem;
      background: rgb(179, 174, 37);
      color: white;
      margin-left: auto;
    }
  }

  .work {
    color: red;
  }
`;
