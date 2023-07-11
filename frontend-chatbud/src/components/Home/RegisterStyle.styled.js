import styled from "styled-components";

export const FormStyle = styled.div`
  .password_login,
  .email_login,
  .name_login,
  .address_login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login,
  .register {
    color: #fff;
    background-image: url("../images/bg.png");
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    .login_container,
    .register_container {
      display: flex;
      align-items: center;
      min-height: 100%;
      flex-grow: 1;
      text-align: center;
    }
    .login_form_page,
    .register_form_page {
      background-color: #f6f8fa;
      width: 300px;
      margin: auto;
      padding: 1rem 2rem 4rem;
      box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
        rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
      border-top: 4px solid rgb(231, 65, 3);
      border-radius: 10px;

      .register-top h1,
      .login-top h1 {
        font-family: "Gudea", sans-serif;
        color: rgb(231, 65, 3);
        font-size: 14px;
        margin: 0.5rem 0;
      }
    }

    .register_form_page {
      min-width: 450px;
      padding: 1rem;
      max-height: 90vh;
      overflow-y: hidden;
    }
  }
  .new_register {
    margin-top: 1rem;
    color: rgb(9, 18, 86);
    font-size: 10px;
    .register_link {
      margin-left: 6px;
      &:hover {
        font-weight: bolder;
        color: rgb(231, 65, 3);
      }
    }
  }

  .submit_btn {
    color: ${({ theme }) => theme.colors.bg};
    background-color: ${({ theme }) => theme.colors.bluetheme};
    &:hover {
      background-color: ${({ theme }) => theme.colors.lightOrange};
    }
  }
`;
