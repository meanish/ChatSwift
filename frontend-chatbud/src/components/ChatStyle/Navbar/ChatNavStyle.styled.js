import styled from "styled-components";

export const ChatNavStyle = styled.div`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container .logo_section {
    flex: 1;
    display: flex;
    img {
      margin: auto;
    }
  }

  .container .contents {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    padding: 0 2rem;
  }
`;
