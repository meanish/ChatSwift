import styled from "styled-components";

export const GroupStyle = styled.div`
  .groupname-container {
    display: flex;
    align-items: center;
padding:20px 0;
    h4 {
      margin-right: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
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
