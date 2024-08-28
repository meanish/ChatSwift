import styled from "styled-components";

export const StyleChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  .chat-root {
    display: flex;
    overflow: hidden;
    flex-grow: 1;

    .user-list {
      flex-grow: 2; /* 30% */
      max-width: 230px; /* Set a fixed width */
      overflow: auto;

      .right-container-button {
        border: none;
        transition: all 300ms;
        cursor: pointer;
        color: white;
        font-family: roboto, sans-serif;
        position: relative;
      }
      .right-container .right-container-button .long-text {
        transition: opacity 700ms, width 1ms linear 270ms,
          font-size 1ms linear 270ms;
        margin-left: 45px;
        font-size: 20px;
        width: auto;
      }
    }
    .create-group {
      display: flex;
      justify-content: space-around;
    }
    .chat-msg {
      flex-grow: 6.5; /* 30% */
    }
    .user-details {
      flex-grow: 1; /* 20% */
      overflow: auto;
    }
  }

  .title {
    flex-grow: 1;
    display: none;
  }

  .search {
    position: relative;
    border-radius: 20px;
    background-color: red;
    &:hover {
      background-color: "blue";
    }
    margin-left: 0;
    width: "100%";
  }

  .searchIcon {
    padding: theme.spacing(0, 2);
    height: 100%;
    position: absolute;
    display: "flex";
    align-items: "center";
    justify-content: "center";
  }
`;
