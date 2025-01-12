import React from "react";
import SynechronIcon from "./SynechronIcon";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";


const theme = createTheme({
    palette: {
      primary: {
        main: "#8400ff",
      },
      secondary: {
        main: "#FBFF91",
      },
    },
  });


const AuthContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container className="background" maxWidth="false">
        <SynechronIcon styling={"background-logo"} />
        <SynechronIcon styling={"top-logo"} />
        <Box className="left">
          <div className="main-text">
            <h1>
              <b id="s-synebank">S</b>yneBank
            </h1>
            <p>
              Empower Your Finances: <b className="s-emph">S</b>ecure,{" "}
              <b className="s-emph">S</b>imple, <b className="s-emph">S</b>
              eamless.
            </p>
          </div>
        </Box>
        <Box className="right-section">
        <Outlet/> {/*The react route URLs are inserted at this portion */}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AuthContainer;
