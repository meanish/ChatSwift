import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:"Work-Sans",sans-serif;
}
html{

  font-size: 80%;
    overflow-x:hidden;
}

body{
    overflow-x:hidden;
    scrollbar-width:thin;
    background-color:${({ theme }) => theme.colors.bg};
    background-image:${({ theme }) => theme.bg.backgroundimage};
     transition: all 300ms;
}
img{
    width:12rem;
    height:auto;
}

.small-logo{
  width:10rem;
  height:auto;
}
.container{
    min-width:85%;
    margin:auto;
    display:flex;
    padding:0.5rem;
}

.custom-icon {
  color:${({ theme }) => theme.colors.eye};
}


.head-text{
  color:gray;
  text-align:center;
  padding:10px 0;
  text-decoration:underline;
  font-size:40px;
  font-family:serif;
}


//scrollbar edit
 .scrollbar {
    float: left;
   max-height: 12rem;
    min-width: 15rem;
    background: #f5f5f5;
    overflow-y: scroll;
    margin-bottom: 25px;
    .force-overflow {
      padding: 2px 2px 10px;
    }
  }

  #scroll_style::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  #scroll_style::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  #scroll_style::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
     background-color:${({ theme }) => theme.colors.eye};
  }
  
  //in getstarted page
   .user_result {
      margin: auto;
      display: flex;
      justify-content: center;

      #wrapper{
        width: 400px;
        .scrollbar{
          width:100%;
           margin-top:10px;
          .force-overflow{
            padding:10px 0;
             border:2px solid ${({ theme }) => theme.colors.bg};
               background-color:${({ theme }) => theme.colors.bluetheme};
            font-size:15px;
            color:${({ theme }) => theme.colors.bg};
            border-radius:8px;
            &:hover{
               background-color:${({ theme }) => theme.colors.lightOrange};
            }
          }
        }
      }
      
    }

button{
  border:none;
  outline:none;
}
//buble effect
.bubble-btn {
  color:${({ theme }) => theme.colors.Darkblue};
  background: #fcba03;
  position: relative;
  min-width: 90px;
  height: 50px;
  padding:0 5px; 
  border-radius: 10px;
  display: flex;
  outline:none;
  align-items: center;
  font-size: 12px;
  font-weight:bold;
  justify-content: center;
  transition:ease 0.3s;
  text-shadow: -2px -2px 5px #fff;
  filter: drop-shadow(4px 4px 10px #fff);
 box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.5),
    10px 5px 10px rgba(0, 0, 0, 0.5),
    inset -5px -5px 10px rgba(255, 255, 255, 0.9);

    &:hover{
      box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.5),
    15px 10px 10px rgba(0, 0, 0, 0.5),
    inset -10px -10px 15px rgba(255, 255, 255, 0.9);
    }
}

.bubble-btn:after {
  content: '';
  position: absolute;
  top: 10px;
  left: 15px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  filter: blur(2px)
}
.bubble-btn:before {
  content: '';
  position: absolute;
  top: 30px;
  left: 50px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  filter: blur(2px)
}
.bubble-btn-small{
  width: 70px;
  height: 35px;
  border:none;
  &:after {
  content: '';
  opacity:0;
}
&:before {
  content: '';
  opacity:0;
}
}


//loader
 .oldloader_container {
    position: absolute;
    top: 0;
    padding: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .No_more {
      border: 3px dotted ${({ theme }) => theme.colors.bluetheme};
      padding: 0.2rem;
      font-weight: bolder;
      color: ${({ theme }) => theme.colors.eye};
    }
  }

  
.loader_container{
  width:100%;
  display:flex;
  justify-content: center;
  margin-top:0.5rem;
}
.nouser {
        font-size: 15px;
        margin-top: 1rem;
        color:${({ theme }) => theme.colors.Darkfeather}
}

//for selected user for grouping
  .selected_user {
    text-align: center;
    max-width: 90px;
    margin: 0.5rem 0;
    p {
      background-color: ${({ theme }) => theme.colors.eye};
      color: #fff;
      display: flex;
      border-radius: 10px;
      align-items: center;
      padding: 0.5rem;
      margin-top: 0.3rem;
      font-weight: bolder;
    }
  }
`;

export default GlobalStyles;
