import styled from "styled-components";

export const NavbarStyle = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #4274c9;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    margin-bottom: 6px;
    top: 0;
    z-index: 1000;
  }

  .logo_section {
    flex: 1;
    img {
      width: 170px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    img:hover {
      transform: scale(1.1);
    }
  }

  .menu_list {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;

      li {
        position: relative;
        margin-left: 25px;
      }

      .list_items {
        color: #ffff;
        font-family: "Pacifico", cursive;
        text-decoration: none;
        font-size: 25px;
        position: relative;
        padding-bottom: 5px;
        transition: color 0.3s ease;
      }

      .list_items.active,
      .list_items:hover {
        color: #110f1c;
        font-size: 27px;
      }

      .list_items:after {
        content: "";
        position: absolute;
        width: 0%;
        height: 2px;
        background-color: #110f1c;
        bottom: 0;
        left: 50%;
        transition: width 0.3s ease, left 0.3s ease;
      }

      .list_items:hover:after {
        width: 100%;
        left: 0;
      }
    }
  }

  .hamburger {
    display: none;
    font-size: 30px;
    cursor: pointer;
    color: #ffff;

  }

  @media (max-width: 768px) {
    .menu_list {
      position: absolute;
      top: 100px;
      right: 0;
      background-color: #4274c9;
      flex-direction: column;
      width: 100%;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;

      &.open {
        max-height: 300px; /* Adjust based on the number of menu items */
      }

      nav ul {
        flex-direction: column;
        align-items: center;

        li {
          margin-left: 0;
          margin-bottom: 20px;
        }
      }
    }

    .hamburger {
      display: flex;
      align-items:center;
    }
  }
`;
