import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login";
import Chat from "./pages/Chat/Chat";
import Register from "./pages/Home/Register";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyle";
import bg_theme from "./images/bg.png";
import bg_theme2 from "./images/2.jpg";


const theme = {
  colors: {
    Darkfeather: "rgb(148,3,3)",
    Darkblue: "rgb(3,6,42)",
    bluetheme: "rgb(9,18,86)",
    lightOrange: "rgb(255,114,4)",
    lowFeature: "rgb(220,18,3)",
    themebg: "rgb(254,199,98)",
    head: "rgb(37,55,117)",
    eye: "rgb(231, 65, 3)",
    lighteye: "rgba(231, 65, 3,0.2)",
    helper: "#8490ff",
    bg: "#F6F8FA",
    footer_bg: "#0a1435",
    gradient:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  media: {
    mobile: "768px",
    tab: "998px",
  },
  bg: {
    backgroundimage: `url(${bg_theme})`,
    backgroundimage2: `url(${bg_theme2})`,
  },
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <div className="App">
          <GlobalStyles />
          <HashRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </HashRouter>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;

