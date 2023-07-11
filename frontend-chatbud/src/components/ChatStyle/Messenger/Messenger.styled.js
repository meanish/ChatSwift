import styled from "styled-components";

export const StyleMessenger = styled.div`
  position: relative;

  .chatbox {
    border-radius: 8px;
  }

  .messages {
    display: flex;
    flex-direction: column;
  }
  .message_field {
    display: flex;
    flex: 1;
  }

  .input-container {
    display: flex;
    align-items: center;
    border-radius: 8px;
    position: absolute;
    width: 100%;
    bottom: 0px;
  }

  .input-field {
    flex: 1;
    padding: 5px;
    border: none;
    outline: none;
    background-color: transparent;
    width: 80%;
  }

  .icons-container {
    display: flex;
    align-items: center;
    width: 20%; /* Set the width to 50% of the input container */
    justify-content: space-around; /* Align the icons to the right */
  }

  .icon {
    font-size: 20px;
    margin-right: 10px;
    color: #757575;
    cursor: pointer;
  }

  .send-button {
    padding: 6px 10px;
    background-color: #0084ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .send-button:hover {
    background-color: #0063cc;
  }

  .send-icon {
    font-size: 20px;
  }
`;
