import styled from "styled-components";

export const GroupStyle = styled.div`
  .groupname-container {
    display: flex;
    align-items: center;
    padding: 20px 0;
    h4 {
      margin-right: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }



  .group_title {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 2rem;
      color: #333;
    }
  }

  .group_body {
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center elements horizontally */
    justify-content: center; /* Center elements vertically */
    gap: 20px; /* Add space between elements */
  }

  .group_name {
    display: flex;
    flex-direction: column; /* Ensure buttons and form elements are vertical */
    align-items: center;
    gap: 10px; /* Add space between the search bar, text field, and button */
    width: 100%;
  }

  .selected_user {
    display: flex;
    flex-wrap: wrap;
    min-width:100%;
    gap: 10px;
    margin-top: 20px;
    flex-direction:row;
    justify-content: center;
    p {
      background: #e0e0e0;
      padding: 5px 10px;
      border-radius: 20px;
      display: flex;
      color:black;
      align-items: center;
      gap: 5px;
    }

    svg {
      cursor: pointer;
    }
  }

  .search-box, .group-members{
    display:flex;
    gap:1rem;
    align-items:center;
  }

  .loader_container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .user_list {
    max-height: 300px;
    overflow-y: auto;
    width: 100%;
  }

  .force-overflow {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
   background: #f9f9f9; /* Light background color */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  z-index: 1001;
  position: relative;
  animation: popUp 0.3s ease-in-out; /* Pop-up animation */
}
.group_box{
  width:100%;
  input{
    width:100%;
    
  }
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

/* Pop-up animation keyframes */
@keyframes popUp {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}


  .bubble-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &.bubble-btn-small {
      padding: 5px 10px;
    }
  }



  .edit-mode {
    display: flex;
    align-items: center;

    input {
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }

    .MuiIconButton-root {
      margin-left: 0.5rem;
    }
  }

  .display-mode {
    display: flex;
    align-items: center;

    span {
      font-size: 1.2rem;
      margin-right: 0.5rem;
    }

    .MuiIconButton-root {
      margin-left: 0.5rem;
    }
  }
`;
