import styled from "styled-components";

export const ChatListStyle = styled.div`
  .goccia {
    color: ${({ theme }) => theme.colors.bluetheme};
    position: relative;
    border-radius: 08px;
    height: 55px;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: bolder;
    padding: 1rem 2rem;
    justify-content: center;
    text-shadow: -2px -2px 5px #fff;
    margin: 0.5rem 0;
    /* filter: drop-shadow(4px 4px 10px #fff);
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2),
      10px 10px 15px rgba(0, 0, 0, 0.25),
      inset -5px -5px 10px rgba(255, 255, 255, 0.9);
    &:hover {
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.4),
        10px 10px 15px rgba(0, 0, 0, 0.5),
        inset -5px -5px 10px rgba(255, 255, 255, 0.8);
    } */

    :hover {
      background: ${({ theme }) => theme.colors.lighteye};
    }
  }
  .goccia.active {
    color: rgb(9, 18, 86);
    font-size: 22px;
    background: ${({ theme }) => theme.colors.lighteye};
  }
`;
