import { Grid2, Typography } from "@mui/material";
import AddAccountButton from "./AddAccountButton";
import AccountCard from "./AccountCard";

const AccountList = ({setAccountsTrigger, accounts}) => {
  return (
    <Grid2
      container
      direction="column"
      spacing={2}
      size={{
        xs: 12,
        md: 9,
        lg: 8,
        xl: 8
      }}
      sx={{
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1.5,
        paddingBottom: 3,
        paddingTop: 3,
        backgroundColor: "rgba(255, 255, 255, 0.65)"

      }}
    >
      <Grid2 size={9} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color:"#000000", fontWeight: "bold" }}>
          Accounts
        </Typography>
        <AddAccountButton clickAccount={() => {setAccountsTrigger(true);}}/>
      </Grid2>
      <Grid2 container direction="column" size={9} spacing={3}>
        {accounts.map((account) => (<AccountCard key={account.accountId} account={account}/>))}
      </Grid2>
    </Grid2>
  );
};

export default AccountList;
