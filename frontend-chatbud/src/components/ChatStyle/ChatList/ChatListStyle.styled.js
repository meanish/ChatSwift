import styled from "styled-components";

export const ChatListStyle = styled.div`
 overflow:hidden;
  .head-text {
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
   
  }

  .toggle-button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  .chat-items {
    max-height: 300px; // Adjust based on your needs
    overflow-y: auto;
  }

  .chat-item {
    position: relative;
    margin-bottom: 0.5rem;
  }

  .user-item {
    position: relative;
    .user-details {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #f4f4f4;
      padding: 0.5rem;
      border-radius: 3px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
    }
    &:hover .user-details {
      display: block;
    }
  }

  .goccia {
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.lightBackground};
    border-radius: 3px;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 1.2rem 2.4rem;
    justify-content: center;
    text-shadow: -1px -1px 2px #fff;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);

    &:hover {
      background: rgba(166, 165, 154, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }

  .goccia.active {
    background: rgba(166, 165, 154, 0.5);
    font-size: 20px;
    color: #4274C9;
    font-weight: bolder;
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
  }
`;
