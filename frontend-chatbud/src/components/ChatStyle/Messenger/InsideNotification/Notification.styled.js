import styled from "styled-components";

export const NotificationStyle = styled.section`
  .notification-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background: none;
    color: #eee;
    padding: 5px;
    cursor: pointer;
    transition: color 0.3s ease;

    svg {
      font-size: 30px;
    }
  }

  .badge {
    position: absolute;
    top: -6px;
    right: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: #ff5252;
    color: white;
    font-size: 12px;
    border-radius: 50%;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .notification-box {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #f0f4ff;
      transform: scale(1.02);
    }

    .menu-item {
      margin-left: 10px;
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
  }

  .MuiMenu-paper {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    overflow: hidden;
  }
`;

