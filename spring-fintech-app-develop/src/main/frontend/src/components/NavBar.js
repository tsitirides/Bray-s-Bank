import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SynechronIcon from "./SynechronIcon";
import "../styles/Home.css";

const NavBar = ({ username }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ boxShadow: "none", backgroundColor: "primary" }}
      >
        <Toolbar className="navbar">
          <div className="nav-right">
            <SynechronIcon styling={"nav-logo"} />
            <Typography variant="h6">
              <b id="nav-s-synebank">S</b>yneBank
            </Typography>
          </div>
          <Button color="inherit">{username}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
