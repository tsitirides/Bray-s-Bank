import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import fintechImage from './Fintech-login-image.png'; // Adjust the path accordingly
import { create } from '@mui/material/styles/createTransitions';

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering) {
      console.log('Registering page');

      // Add registration logic here
      const createUserData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        username,
        password,
      };

      console.log(createUserData);
      
      try {
        const response = await fetch('http://localhost:8080/signup', {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify(createUserData),
        });

        if (response.ok) {
          console.log('User submitted successful');
        } else {
          console.error('Failed to submit create user info');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Login page');

      // Add login logic here
      const loginUserData = {
        username,
        password,
      };

      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify(loginUserData),
        });

        if (response.ok) {
          console.log('User login successful');
        } else {
          console.error('Failed to submit login user info');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const toggleForm = () => {
    // Reset fields if toggling from login and registration, and vice versa
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="container">
      <div className="imageSection" style={{ backgroundImage: `url(${fintechImage})` }}>
        {/* Left half with image */}
      </div>
      <div className="formSection">
        <div className="formContainer">
          <h2>{isRegistering ? 'Create an Account' : 'Welcome to SyneBank'}</h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            {!isRegistering && (
              <>
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <button type="submit" className="loginButton">
              {isRegistering ? 'Create an Account' : 'Login'}
            </button>
          </form>
          <div className="signupPrompt">
            {isRegistering ? (
              <>Already have an account? <a href="#" onClick={toggleForm}>Login</a></>
            ) : (
              <>Don’t have an account? <a href="#" onClick={toggleForm}>Create an account</a></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;