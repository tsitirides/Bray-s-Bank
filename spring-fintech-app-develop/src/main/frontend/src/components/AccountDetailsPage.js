import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography
} from "@mui/material";
import TransactionsList from "./TransactionsList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/AccountDetail.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8400ff",
    },
    secondary: {
      main: "#FBFF91",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

// Function to format the account number
const formatAccountNumber = (number) => {
    return number.replace(/(.{4})/g, '$1 ').trim(); // Insert space every 4 characters
  };
  
// Function to format the balance with commas
const formatBalance = (balance) => {
  return balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const AccountDetailsPage = () => {
  const { accountId } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [username, setUsername] = useState(""); // State for username
  const [transactions, setTransactions] = useState([]); // State for transactions

  // Function to decode and extract username from token
  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null; // Return null if no token is available
    const payloadBase64 = token.split(".")[1];
    const payloadJSON = atob(payloadBase64);
    const payload = JSON.parse(payloadJSON);
    return payload.sub; // Assuming 'sub' contains the username
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/api/accounts/${accountId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setAccountDetails(data);
        } else {
          alert('Error fetching account details');
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
        alert('Error fetching account details');
      }

      // Fetch transactions for the account
      try {
        const transactionsResponse = await fetch(`http://localhost:8080/api/accounts/${accountId}/transactions`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (transactionsResponse.ok) {
          const transactionsData = await transactionsResponse.json();
          setTransactions(transactionsData);
        } else {
          alert('Error fetching transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        alert('Error fetching transactions');
      }

      // Get username from token
      const user = getUsernameFromToken();
      setUsername(user);
    };

    fetchAccountDetails();
  }, [accountId]);

  if (!accountDetails) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <NavBar username={username} />
      <Box className="mainDetailsContainer">
        <Box>
          <Typography variant="h3">{accountDetails.accountType} Account - {formatAccountNumber(accountDetails.accountNumber)}</Typography>
        </Box>
        <Box>
          <p className="balanceText">${formatBalance(accountDetails.balance)}</p>
        </Box>
        {/* Pass mock transactions to TransactionsList */}
        <TransactionsList accountId={accountId} transactions={transactions} />
      </Box>
    </ThemeProvider>
  );
};

export default AccountDetailsPage;