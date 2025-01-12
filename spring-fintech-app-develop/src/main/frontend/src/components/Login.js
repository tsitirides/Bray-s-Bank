import React, { useState } from "react";
import "../styles/Main.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSignUpRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  const [formValues, setFormValues] = useState({
    username: "",
    //email: '',
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const newErrors = {};

    // Checks if every field is not empty
    for (const field in formValues) {
      if (!formValues[field]) {
        newErrors[field] = `${formatField(field)} is required`; // Add error message
      }
    }

    // Validate each field by calling the respective validation functions
    handleUsernameBlur({ target: { value: formValues.username } });
    //handleEmailBlur({ target: { value: formValues.email } });
    handlePasswordBlur({ target: { value: formValues.password } });

    Object.keys(errors).forEach((field) => {
      if (errors[field]) {
        newErrors[field] = errors[field];
      }
    });

    setErrors(newErrors);

    const allValid = Object.keys(newErrors).length === 0;

    // Only submit the form if everything is valid
    if (allValid) {
      console.log("Login:", formValues);
      Login();
    } else {
      console.log("not valid");
    }
  };

  const createLoginUserData = () => {
    return {
      username: formValues.username,
      password: formValues.password,
    };
  };

  //Login functionality
  const Login = async () => {
    const loginUserData = createLoginUserData();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUserData),
      });

      if (response.ok) {
        //if logged in received a good response, we
        //get the data token from the backend and
        //store it on the client
        const token = await response.text();
        console.log("token: " + token);
        localStorage.setItem("token", token);
        console.log("User login successful");
        setServerError("");
        navigate("/Home");
      } else {
        console.error("Failed to submit login user info");
        setServerError("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUsernameBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    if (!value) {
      errorMessage = "Username is required";
    } else if (value.length < 3) {
      errorMessage = "Username must be at least 3 characters long";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      username: errorMessage,
    }));
  };

  const handleEmailBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    var re = /\S+@\S+\.\S+/;

    if (!value) {
      errorMessage = "Email is required";
    } else if (!re.test(value)) {
      errorMessage = "Invalid Email";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: errorMessage,
    }));
  };

  const handlePasswordBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    if (!value) {
      errorMessage = "Password is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: errorMessage,
    }));
  };

  const formatField = (field) => {
    return (
      field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  return (
    <div>
      <Box
        className="signup-form"
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Log In</h2>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          type="text"
          value={formValues.username}
          onChange={handleInputChange}
          onBlur={handleUsernameBlur}
          error={!!errors.username}
          helperText={errors.username}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          onBlur={handlePasswordBlur}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          className="create-account-btn"
          variant="contained"
          size="large"
          color="primary"
          type="submit"
        >
          Log In
        </Button>
        {serverError && (
          <p style={{ color: "red" }}>{serverError}</p> // Conditional rendering of server error
        )}
        <p className="bottom-text">
          Don't have an account?{" "}
          <b onClick={handleSignUpRedirect} style={{ cursor: "pointer" }}>
            Sign Up
          </b>
        </p>
      </Box>
    </div>
  );
}

export default Login;
