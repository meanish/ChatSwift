import styled from "styled-components";

export const ChatNavStyle = styled.div`
  .container {
    display: flex;
    justify-content: space-between;

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
    gap: 10px;
    align-items: center;
    justify-content:flex-end;
    padding: 0 2rem;
  }

    @media (max-width: 900px) {
  .container .contents {
    display: flex;
    gap: 10px;
    align-items:flex-end;
    justify-content:;
    padding: 0 2rem;
  }
    }
`;
