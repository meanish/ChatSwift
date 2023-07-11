import styled from "styled-components";

export const GroupStyle = styled.div`
  .groupname {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    input {
      color: green;
      font-size: 16px;
      padding: 10px;
      outline: none;
    }

    .edit-actions {
      display: flex;
      flex-direction: column;
      button {
        margin-top: 0.2rem;
      }
    }
  }
`;
