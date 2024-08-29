import styled from "styled-components";

export const GroupUserStyle = styled.div`
  overflow-y: auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background}; /* Use a background color from the theme */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for a subtle depth effect */

  .group_members {
    h5 {
      font-size: 22px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary}; /* Use the primary color from the theme */
      margin-bottom: 1.5rem;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary}; /* Underline to distinguish the title */
      padding-bottom: 0.5rem;
    }

    .add_member {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 20px; /* Spacing between add_member and the member list */

      .bubble-btn {
        background-color: ${({ theme }) => theme.colors.secondary}; /* Use a secondary color for the button */
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease; /* Smooth transition effect */

        &:hover {
          background-color: ${({ theme }) => theme.colors.secondaryDark}; /* Darken on hover */
        }
      }

      .selected_user {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;

        p {
          background-color: ${({ theme }) => theme.colors.lightGrey};
          padding: 5px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: ${({ theme }) => theme.colors.darkGrey};
        }

        .icon-delete {
          margin-left: 5px;
          cursor: pointer;
          color: ${({ theme }) => theme.colors.red};
          transition: color 0.3s ease;

          &:hover {
            color: ${({ theme }) => theme.colors.darkRed}; /* Darken on hover */
          }
        }
      }
    }

    .member_identity {
      background-color: ${({ theme }) => theme.colors.lightBackground};
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      transition: background-color 0.3s ease; /* Smooth background transition */

      &:hover {
        background-color: ${({ theme }) => theme.colors.hoverBackground}; /* Slightly darken on hover */
      }

      .name {
        font-size: 16px;
        color: ${({ theme }) => theme.colors.text};
      }

      .remove {
        .icon-delete {
          cursor: pointer;
          color: ${({ theme }) => theme.colors.red};
          transition: color 0.3s ease;

          &:hover {
            color: ${({ theme }) => theme.colors.darkRed}; /* Darken on hover */
          }
        }
      }
    }

    .loader_container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }

  .exit_group {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
      background-color: ${({ theme }) => theme.colors.red}; /* Use a theme color for the exit button */
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.darkRed}; /* Darken on hover */
      }
    }
  }
`;

