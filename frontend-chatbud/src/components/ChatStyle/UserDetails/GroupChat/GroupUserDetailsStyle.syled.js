import styled from "styled-components";

export const GroupUserStyle = styled.div`
  overflow-y: auto;


  .group_members {
    h5 {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.bluetheme};
      margin-bottom: 1rem;
    }
    .add_member {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .member_identity {
      background-color: ${({ theme }) => theme.colors.lighteye};
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dotted green;
      padding: 0.5rem 2rem;
      .name {
        font-size: 15px;
      }
    }
  }
`;
