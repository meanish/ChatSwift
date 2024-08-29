import styled from "styled-components";

export const ChatBoxStyle = styled.div`
  color: ${({ theme }) => theme.colors.bluetheme};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 1.5rem;

  .chat_head {
    display: flex;
    width: 100%;
    text-transform:uppercase;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .user-name {
    margin: auto;
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
  }

  .user_detail {
    .box {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      border: 1px solid ${({ theme }) => theme.colors.primary};
      border-radius: 8px;
      padding: 1rem;
      background: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.textLight};
      margin-left: auto;
      margin-top: 1rem;
    }
  }

  .work {
    color: ${({ theme }) => theme.colors.danger};
    font-weight: bold;
  }
`;
