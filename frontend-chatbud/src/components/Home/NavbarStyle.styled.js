import styled from "styled-components";

export const NavbarStyle = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
  }

  header h1 {
    margin: 0px;
    color: green;
  }
  nav > ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  nav > ul > li {
    position: relative;
    padding: 0px 15px;
  }
  nav ul li .list_items {
    color: rgb(231, 65, 3);
    font-family: "Pacifico", cursive;
    text-decoration: none;

    font-size: 20px;
  }

  nav ul li .list_items.active {
    color: rgb(9, 18, 86);
    font-size: 22px;
  }

  nav ul li .list_items:hover {
    color: rgb(9, 18, 86);
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
    border-color: #666 transparent transparent transparent;
    position: absolute;
    top: 30px;
    right: 0px;
  }
  nav > ul > .dropDown-menu:hover:after {
    border-width: 0px 5px 5px 5px;
    border-color: transparent transparent green transparent;
  }
  nav > ul > .dropDown-menu .dropDown-menu:after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #666;
    position: absolute;
    top: 16px;
    right: 10px;
  }
  nav > ul > .dropDown-menu .dropDown-menu:hover:after {
    border-width: 5px 5px 5px 0px;
    border-color: transparent #666 transparent transparent;
  }
  nav .dropDown-menu > ul {
    list-style: none;
    margin: 24px 0px 0px;
    padding: 12px 0px;
    position: absolute;
    background-color: white;
    min-width: 150px;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.3);
    display: none;
  }
  nav .dropDown-menu .dropDown-menu > ul {
    margin: 0px 0px 0px;
    left: 100%;
    top: 0px;
  }
  nav .dropDown-menu .dropDown-menu.left > ul {
    left: auto;
    right: 100%;
  }
  nav .dropDown-menu:hover > ul {
    display: block;
  }
  nav .dropDown-menu li a {
    display: block;
    padding: 12px 12px;
  }

  .logo_section {
    flex: 1;
  }

  .menu_list {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
