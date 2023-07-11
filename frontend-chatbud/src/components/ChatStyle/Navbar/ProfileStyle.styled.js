import styled from "styled-components";

export const ProfileStyle = styled.div`
  .circle {
    width: 30px;
    height: 30px;
    border-radius: 50%; /* Set border radius to 50% to create a circle */
    overflow: hidden; /* Hide any overflow beyond the circle */
  }
  /* Style for the image */
  .circle img {
    width: 100%; /* Make the image fill the circle */
    height: auto;
  }
`;
