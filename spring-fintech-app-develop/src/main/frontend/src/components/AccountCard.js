import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Function to format the balance with commas
const formatBalance = (balance) => {
  return balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Function to format the account number
const formatAccountNumber = (number) => {
  return number.replace(/(.{4})/g, '$1 ').trim(); // Insert space every 4 characters
};

const AccountCard = ({ account }) => {

  const navigate = useNavigate(); // Initialize the navigate function

  const handleCardClick = () => {
    navigate(`/account/${account.accountId}`); 
  };

  return (
    <Box>
      <Card variant="outlined"
        sx={{
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleCardClick} // Handle click to fetch transactions and toggle visibility
      >
        <CardContent>
          <Typography component="div" sx={{ fontWeight: "medium", paddingBottom: 1 }}>
            {account.accountType} ACCOUNT
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 1,
              paddingBottom: 1,
              marginRight: 2,
            }}
          >
            <Typography>{formatAccountNumber(account.accountNumber)}</Typography>
            <Typography sx={{ fontWeight: "bold" }}>${formatBalance(account.balance)}</Typography>
          </Box>
          <Divider />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountCard;