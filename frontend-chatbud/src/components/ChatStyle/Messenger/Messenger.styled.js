// import styled from "styled-components";

// export const StyleMessenger = styled.div`
//   position: relative;

//   .chatbox {
//     border-radius: 8px;
//   }

//   .messages {
//     display: flex;
//     flex-direction: column;
//   }
//   .message_field {
//     display: flex;
//     flex: 1;
//   }

//   .input-container {
//     display: flex;
//     align-items: center;
//     border-radius: 8px;
//     position: absolute;
//     width: 100%;
//     bottom: 0px;
//   }

//   .input-field {
//     flex: 1;
//     padding: 5px;
//     border: none;
//     outline: none;
//     background-color: transparent;
//     width: 80%;
//   }

//   .icons-container {
//     display: flex;
//     align-items: center;
//     width: 20%; /* Set the width to 50% of the input container */
//     justify-content: space-around; /* Align the icons to the right */
//   }

//   .icon {
//     font-size: 20px;
//     margin-right: 10px;
//     color: #757575;
//     cursor: pointer;
//   }

//   .send-button {
//     padding: 6px 10px;
//     background-color: #0084ff;
//     color: #fff;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }

//   .send-button:hover {
//     background-color: #0063cc;
//   }

//   .send-icon {
//     font-size: 20px;
//   }
// `;



import styled from "styled-components";

export const StyleMessenger = styled.div`

.inside-chat{
  position: relative;
  display: flex;
  justify-content: center; /* Center the chatbox horizontally */
  align-items: center; /* Center the chatbox vertically */
min-height:100vh;
  background-color: #f0f2f5;
}






  .chatbox {
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 100%; /* Take full width of the container */
    max-width: 1200px; /* Set a maximum width to prevent it from becoming too wide */
    height: 100%; /* Full height of the container */
    display: flex;
    flex-direction: column;
  }

.arrowback{
   display:none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;  /* Light background color */
  border-radius: 50%;  /* Circular shape */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);  /* Soft shadow */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #e0e0e0;  /* Slightly darker on hover */
    transform: scale(1.1);  /* Slight zoom effect on hover */
  }

  svg {
   color:#4274C9;
  /* Icon color */
    font-size: 24px;  /* Icon size */
  }
}
 @media (max-width: 900px) {
  .userchat-list{
    margin:30px;
  }
  .inside-chat{
    min-height:auto;
  }
  .arrowback{
       display:flex;

  }
 }

  .messages {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1; /* Take up remaining space in the chatbox */
    padding: 10px;
    gap: 8px; /* Space between messages */
  }

  .message_field {
    display: flex;
    padding: 10px 0; /* Space above and below the input field */

    button {
  height: 100%; /* Match the height of the input field */
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

  }

  .input-container {
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 10px;
    background-color: #e9ebee;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    width: 100%; /* Ensure input container takes full width */
  }

  .input-field {
    flex: 1;
    border: 1px solid #dcdcdc;
    outline: none;
    border-radius: 8px;
    background-color: #ffffff;
    margin-right: 8px;
    width: 100%; /* Ensure input field takes full available width */
  }

  .icons-container {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end; /* Align icons to the right */
    width: auto;
    color:green;
  }

  .icon {
    color: #606770;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .icon:hover {
    color: #007bff;
  }

  .send-button {
    padding: 8px 14px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .send-button:hover {
    background-color: #0056b3;
  }

  .send-icon {
    font-size: 24px;
  }

  @media (max-width: 900px) {
  .button.arrowback {
    position: fixed;
    top: 200px; /* Adjust as needed */
    z-index:99999;
    left: 10px; /* Adjust as needed */
    /* Additional styles to ensure proper visibility and positioning */
  }
  .icons-container{
    display:none;
  }
}
`;
