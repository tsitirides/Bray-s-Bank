import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

// Utility function to format the date
const formatDate = (dateString) => {
    return dateString.split("T")[0]; // Take only the date part (YYYY-MM-DD)
  };
  
// Function to format the amounts with commas
const formatAmount = (formatAmount) => {
  return formatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const TransactionsList = ({ transactions }) => {
  const cellStyle = { fontSize: '1.2rem' };


  return (
    <Paper elevation={3} sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', paddingLeft: 1.5 }}>
        Transaction History
      </Typography>
      {transactions.length === 0 ? (
        <Typography sx={{ paddingLeft: 1.5 }}>No transactions found.</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="20%" sx={cellStyle}>Date</TableCell>
                <TableCell width="40%" sx={cellStyle}>Description</TableCell>
                <TableCell width="25%" sx={cellStyle}>Category</TableCell>
                <TableCell width="15%" align="right" sx={cellStyle}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transactionId}>
                  <TableCell width="20%" sx={cellStyle}>{formatDate(transaction.transactionDate)}</TableCell>
                  <TableCell width="40%" sx={cellStyle}>{transaction.transactionDescription}</TableCell>
                  <TableCell width="25%" sx={cellStyle}>{transaction.categoryName}</TableCell>
                  <TableCell width="15%" align="right" sx={cellStyle}>${formatAmount(transaction.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default TransactionsList;