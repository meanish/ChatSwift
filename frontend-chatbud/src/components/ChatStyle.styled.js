import styled from "styled-components";

export const StyleChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* Ensure that the whole chat root fits within the viewport */

  .chat-root {
    display: flex;
    overflow: hidden;
    flex-grow: 1;

    .user-list {
      flex-grow: 1;
      max-width: 15%;
      overflow-y: auto; /* Add vertical scrollbar if content overflows */
      background-color: #f4f4f4;
      display: flex;
      flex-direction: column;
    }

    .chat-msg {
      flex-grow: 2;
      max-width: 65%;
      overflow-y: auto; /* Add vertical scrollbar if content overflows */
    }

    .user-details {
      flex-grow: 1;
      max-width: 20%;
      overflow-y: auto; /* Add vertical scrollbar if content overflows */
      background-color: #f4f4f4;
      display: flex;
      flex-direction: column;
    }
  }

  .create-group {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    background: #e6e5dc;
  }
   @media (max-width: 900px) {
    .create-group {
    margin-bottom: 30px;
  }
   }

  .title {
    flex-grow: 1;
    display: none;
  }

  .search {
    position: relative;
    border-radius: 20px;
    background-color: #ff5722;
    margin-left: 0;
    width: 100%;

    &:hover {
      background-color: #e64a19;
    }
  }

  .searchIcon {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }




 @media (max-width: 1000px){
   .chat-root {

  .user-details{
   display:none;

  }
  .user-list{
  max-width: 30%;

  }
  }
 }
  @media (max-width: 900px) {


   .chat-root {
      flex-direction: column;
      .user-list,
      .user-details {
  max-width: 100%;
      }
  .chat-msg {
        max-width: 100%;
  }
.user-list{
  max-width: 100%;
 

}
.user-details{
   display:none;
}
      .chat-msg {
        max-width: 100%;
        flex-grow: 1;

      }
    }

    .create-group {
      padding: 15px 10px;
    }
  }

  @media (max-width: 480px) {
    .chat-root {
      flex-direction: column;

      .user-list,
      .user-details {
        max-width: 100%;
      }

      .chat-msg {
        max-width: 100%;
        overflow-y: auto; /* Ensure scrollbar appears if content overflows */
      }

      .user-details {
        display:none;
      }
    }

    .create-group {
      padding: 10px 5px;
    }
  }
`;
