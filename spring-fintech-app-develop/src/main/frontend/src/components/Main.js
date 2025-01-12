import "../styles/Main.css"; // Import the CSS file
import SignUp from "./Signup";
import Login from "./Login";
import Home from "./Home";
import AccountDetailsPage from "./AccountDetailsPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import AppBackground from "./AppBackground";


function Main() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthContainer />}> {/*We use this element to wrap the login and signup routes*/}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AppBackground />}>
          <Route path="/home" element={<Home />} />
          <Route path="/account/:accountId" element={<AccountDetailsPage />} /> {/* New route for account details */}
        </Route>
      </Routes>
    </Router>
  );
}

export default Main;