import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SynechronIcon from "./SynechronIcon";

const AddAccountButton = ({ clickAccount }) => {
  const [open, setOpen] = useState(false);
  const [accountTypes, setAccountTypes] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchAccountTypes();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAccountTypes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/accounts/types");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data: " + data);
      setAccountTypes(data);
    } catch (error) {
      console.error("There was an error fetching the account types!", error);
    }
  };

  const handleCreateAccount = async (accountType) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/accounts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          accountType: accountType,
          // other form data if necessary
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Account created successfully:", result);
      clickAccount();
      handleClose(); // Close the dialog after successful creation
    } catch (error) {
      console.error("There was an error creating the account:", error);
    }
    
  };

  return (
    <Box>
      {/* Main UI Components */}
      <Box
        sx={
          {
            /* Your existing layout here... */
          }
        }
      >
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          sx={{
            borderRadius: "50px",
            borderColor: "#8400ff",
            color: "#8400ff",
            textTransform: "none",
            backgroundColor: "#FFFFFF"
          }}
        >
          + Add Account
        </Button>

        {/* Dialog for creating accounts */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Open Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select the type of account you would like to open.
            </DialogContentText>
            <Box display="flex" flexDirection="column">
              {accountTypes.map((type, index) => (
                <Button
                  key={index}
                  onClick={() => handleCreateAccount(type)}
                  variant="contained"
                  sx={{ margin: "8px 0" }}
                >
                  {type}
                </Button>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AddAccountButton;
