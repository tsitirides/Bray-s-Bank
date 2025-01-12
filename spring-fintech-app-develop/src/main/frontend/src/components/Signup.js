import "../styles/Main.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleSignInRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    sinNumber: "",
    homeAddress: "",
  });

  const [errors, setErrors] = useState({});

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
    handleFirstNameBlur({ target: { value: formValues.firstName } });
    handleLastNameBlur({ target: { value: formValues.lastName } });
    handleUsernameBlur({ target: { value: formValues.username } });
    handleEmailBlur({ target: { value: formValues.email } });
    handlePhoneNumberBlur({ target: { value: formValues.phoneNumber } });
    handlePasswordBlur({ target: { value: formValues.password } });
    handleConfirmPasswordBlur({
      target: { value: formValues.confirmPassword },
    });
    handleSinNumberBlur({ target: { value: formValues.sinNumber } });
    handleHomeAddressBlur({ target: { value: formValues.homeAddress } });

    Object.keys(errors).forEach((field) => {
      if (errors[field]) {
        newErrors[field] = errors[field];
      }
    });

    setErrors(newErrors);

    const allValid = Object.keys(newErrors).length === 0;

    // Only submit the form if everything is valid
    if (allValid) {
      console.log("Submitting form:", formValues);
      SubmitForm();
    } else {
      console.log("not valid");
    }
  };

  const createUserData = () => {
    return {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      username: formValues.username,
      password: formValues.password,
      sinNumber: formValues.sinNumber,
      homeAddress: formValues.homeAddress,
    };
  };
  const SubmitForm = async () => {
    const userData = createUserData();
    console.log(userData);

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User submitted successful");
        navigate("/login"); 
      } else {
        console.error("Failed to submit create user info");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add handlers for the new fields
  const handleSinNumberBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    if (!value) {
      errorMessage = "SIN Number is required";
    } else if (value.length < 9) {
      // Assuming SIN should have a specific length
      errorMessage = "SIN Number must be 9 digits long";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      sinNumber: errorMessage,
    }));
  };

  const handleHomeAddressBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    if (!value) {
      errorMessage = "Home Address is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      homeAddress: errorMessage,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFirstNameBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    if (!value) {
      errorMessage = "First name is required";
    } else if (value.length < 2) {
      errorMessage = "First name must be at least 2 characters long";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      firstName: errorMessage,
    }));
  };

  const handleLastNameBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    if (!value) {
      errorMessage = "Last name is required";
    } else if (value.length < 2) {
      errorMessage = "Last name must be at least 2 characters long";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: errorMessage,
    }));
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

  const handlePhoneNumberBlur = (e) => {
    const { value } = e.target;
    let errorMessage;

    const phoneRegex =
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

    if (!value) {
      errorMessage = "Phone Number is required";
    } else {
      errorMessage = phoneRegex.test(value) ? "" : "Invalid phone number";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: errorMessage,
    }));
  };

  const isValidPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    let errorMessage = "";

    if (password.length < minLength) {
      errorMessage = "Password must be at least 8 characters long.";
    } else if (!hasUpperCase) {
      errorMessage = "Password must contain at least one uppercase letter.";
    } else if (!hasLowerCase) {
      errorMessage = "Password must contain at least one lowercase letter.";
    } else if (!hasDigit) {
      errorMessage = "Password must contain at least one digit.";
    } else if (!hasSpecialChar) {
      errorMessage = "Password must contain at least one special character.";
    }

    return errorMessage;
  };

  const handlePasswordBlur = (e) => {
    const { value } = e.target;
    const errorMessage = isValidPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: errorMessage,
    }));
  };

  const handleConfirmPasswordBlur = (e) => {
    const { value } = e.target;

    const errorMessage =
      value && value === formValues.password ? "" : "Passwords do not match";

    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: errorMessage,
    }));
  };

  const formatField = (field) => {
    return (
      field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  return (
    <>
      <Box
        className="signup-form"
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstName"
          type="text"
          value={formValues.firstName}
          onChange={handleInputChange}
          onBlur={handleFirstNameBlur}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastName"
          type="text"
          value={formValues.lastName}
          onChange={handleInputChange}
          onBlur={handleLastNameBlur}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />

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
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          type="text"
          value={formValues.email}
          onChange={handleInputChange}
          onBlur={handleEmailBlur}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phoneNumber"
          type="text"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
          onBlur={handlePhoneNumberBlur}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />

        <TextField
          label="SIN Number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="sinNumber"
          type="text"
          value={formValues.sinNumber}
          onChange={handleInputChange}
          onBlur={handleSinNumberBlur}
          error={!!errors.sinNumber}
          helperText={errors.sinNumber}
        />

        <TextField
          label="Home Address"
          variant="outlined"
          fullWidth
          margin="normal"
          name="homeAddress"
          type="text"
          value={formValues.homeAddress}
          onChange={handleInputChange}
          onBlur={handleHomeAddressBlur}
          error={!!errors.homeAddress}
          helperText={errors.homeAddress}
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

        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="confirmPassword"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleConfirmPasswordBlur}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <Button
          className="create-account-btn"
          variant="contained"
          size="large"
          color="primary"
          type="submit"
        >
          Create Account
        </Button>
        <p className="bottom-text">
          Already have an account?{" "}
          <b onClick={handleSignInRedirect} style={{ cursor: "pointer" }}>
            Sign In
          </b>
        </p>
      </Box>
    </>
  );
}

export default SignUp;
