import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import backgroundLines from "../assets/background_lines.png";

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

const AppBackground = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container >
        <img
          src={backgroundLines}
          alt="background"
          style={{
            backgroundColor: "#FEFFEC",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
      </Container>
        <Box>
          <Outlet /> {/* The react route URLs are inserted at this portion */}
        </Box>
    </ThemeProvider>
  );
};

export default AppBackground;