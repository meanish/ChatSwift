import styled from "styled-components";

export const ProfileCardStyle = styled.div`
  .card {
    background-color: #fff;
    height: 450px;
    width: 300px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: blue;
    border-radius: 10px;
    box-shadow: 5px 5px 15px 10px #262626;
  }
  .profile_img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    position: relative;
    top: 80px;
    left: 70px;
    border: 4px solid #fff;
    outline: none;
  }
  .card .card_content .Username {
    color: green;
  }
`;
