import styled from "styled-components";

export const SearchDrawerStyle = styled.div`
  .user_list {
    display: none;
  }
  .search-box {
    font-size: 20px;
    padding: 0.2rem;
    border: 1px solid #c1c1c1;
    width: 9.8em;
    border-radius: 10px;
    transition: 0.2s;
    display: flex;
    width: 100%;

    input {
      font-family: Proxima Nova;
      letter-spacing: -0.2px;
      font-size: 15px;
      border: none;
      color: #323232;
      border-radius: 5px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }

    button:hover {
      cursor: pointer;
    }
  }
`;
