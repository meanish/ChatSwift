import styled from "styled-components";

export const NavbarStyle = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #abb4cc; /* Light background */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
border-radius:5px;
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
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  nav ul li {
    position: relative;
    margin-left: 25px;
  }

  nav ul li .list_items {
    color: #ffff;
    font-family: "Pacifico", cursive;
    text-decoration: none;
    font-size: 21px;
    position: relative;
    padding-bottom: 5px;
    transition: color 0.3s ease;
  }

  nav ul li .list_items.active,
  nav ul li .list_items:hover {
    color: #007bff
  }

  nav ul li .list_items:after {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: #007bff;
    bottom: 0;
    left: 50%;
    transition: width 0.3s ease, left 0.3s ease;
  }

  nav ul li .list_items:hover:after {
    width: 100%;
    left: 0;
  }

  .dropDown-menu {
    position: relative;
  }

  nav > ul > .dropDown-menu:after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #007bff transparent transparent transparent;
    position: absolute;
    top: 30px;
    right: 0px;
  }

  nav > ul > .dropDown-menu:hover:after {
    border-width: 0px 5px 5px 5px;
    border-color: transparent transparent #007bff transparent;
  }

  nav .dropDown-menu > ul {
    list-style: none;
    margin: 24px 0px 0px;
    padding: 12px 0px;
    position: absolute;
    background-color: #ffffff;
    min-width: 150px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
    display: none;
    border-radius: 4px;
  }

  nav .dropDown-menu:hover > ul {
    display: block;
  }

  nav .dropDown-menu li a {
    display: block;
    padding: 12px 20px;
    color: #495057;
    font-size: 16px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  nav .dropDown-menu li a:hover {
    background-color: #e9ecef; /* Light hover effect */
    color: #007bff;
  }
`;
