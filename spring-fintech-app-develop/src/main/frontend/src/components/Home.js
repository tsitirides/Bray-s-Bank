import NavBar from "./NavBar";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid2,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/Home.css";
import piggyIcon from "../assets/piggy_icon.png";
import AccountList from "./AccountList";

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



const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [username, setUsername] = useState("");
  const [accountsTrigger, setAccountsTrigger] = useState(false);

  //Parsing the encoded data and decoding it to extract the username
  const getUsernameFromToken = () =>{
    const token = localStorage.getItem("token");
    const payloadBase64 = token.split(".")[1];
    const payloadJSON = atob(payloadBase64); //decodes and turns it into json
    const payload = JSON.parse(payloadJSON); //turns into JS object
    return payload.sub;
  }

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        // Get username
        setUsername(getUsernameFromToken());

        // Fetch account details
        const accountResponse = await fetch("http://localhost:8080/api/accounts/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for session-based authentication
        });

        if (accountResponse.ok) {
          const data = await accountResponse.json();
          setAccounts(data); // Assuming the response has an 'accounts' field
        } else {
          alert("Response not okay when fetching account details");
        }
      } catch (error) {
        alert("Error fetching account details");
        console.log(error);
      }
    };
   
    fetchAccount();

    if (accountsTrigger){
      setAccountsTrigger(false);
    }
  }, [accountsTrigger]);



  return (
    <ThemeProvider theme={theme}>
      <Box>
        <NavBar username={username} />
        <Box>
          <Grid2
            container
            direction="column"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Grid2 container spacing={10} sx={{ justifyContent: "center" }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Welcome {username}
              </Typography>
              <img src={piggyIcon} alt="piggy Icon" />
            </Grid2>
            {/*Card and accounts container*/}
            <AccountList setAccountsTrigger={setAccountsTrigger} accounts={accounts}/>
          </Grid2>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
