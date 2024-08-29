import styled from "styled-components";

export const MessageStyle = styled.div`
  /* This is compiled SCSS */
  flex: 1;
  border: 1px solid green;
  background-image: ${({ theme }) => theme.bg.backgroundimage2};
  padding-bottom: 1.5rem;
  position: relative;

  .loader_container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height:400px;
  }

 

  .message-list {
    height: 100%;
    overflow-y: scroll;
    min-height: 400px;
    padding: 0 1rem 0rem;
  }

  .message-container {
    opacity: 0;
    animation: fade-in 0.5s ease forwards;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  /* Hide the scrollbar */
  .message-list::-webkit-scrollbar {
    width: 0.5em;
  }

  .message-list::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  .message-list::-webkit-scrollbar-track {
    background: transparent;
  }
  .sent,
  .received {
    clear: both;
  }

  .sent::before,
  .received::before,
  .sent::after,
  .received::after {
    content: "";
    display: table;
  }

  header,
  section,
  footer {
    padding: 2em;
  }

  .center {
    max-width: 100%;
  }

  .sent,
  .received {
    margin-top: 0.0625em;
    margin-bottom: 0.0625em;
    padding: 0.25em 1em;
  }

  .sent p,
  .received p {
    margin: 0;
    line-height: 1.5;
  }

  .sent .message {
    color: white;
    background-color: dodgerblue;
    border-radius: 1em 0.25em 0.25em 1em;
  }

  .sent:first-child {
    border-radius: 1em 1em 0.25em 1em;
  }

  .sent:last-child {
    border-radius: 1em 0.25em 1em 1em;
  }

  .sent:only-child {
    border-radius: 1em;
  }

  .received .message {
    color: black;
    background-color: lightgray;
    border-radius: 0.25em 1em 1em 0.25em;
  }

  .received:first-child {
    border-radius: 1em 1em 1em 0.25em;
  }

  .received:last-child {
    border-radius: 0.25em 1em 1em 1em;
  }

  .received:only-child {
    border-radius: 1em;
  }

  .message-box {
    margin-top: 1em;
    padding: 1em 0.5em;
    border-top-width: 0.0625em;
    border-style: solid;
    border-color: lightgray;
    color: darkgray;
  }

  .message-box p {
    margin: 0;
    line-height: 1.5;
  }

  .col-sent {
    margin-top: 0.25em !important;
  }

  .col-received {
    margin-top: 0.25em !important;
  }

  .msg_content {
    position: relative;
  }
  .sender_profile {
    position: absolute;
    left: 0px;
    top: -12px;
    font-size: 9px;
    color: green;
  }

  .msg_content {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .received {
    flex-direction: row;
  }

  .sent {
    flex-direction: row-reverse;
  }

  .sender_profile {
    margin-right: 10px;
    font-weight: bold;
  }

  .message {
    padding: 10px;
    border-radius: 10px;

    .New_Message {
      height: 70vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      word-spacing: 5px;
      color: ${({ theme }) => theme.colors.bg};
      p {
        background-color: ${({ theme }) => theme.colors.eye};
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-family: "Pacifico", cursive;
      }
    }
  }
`;
