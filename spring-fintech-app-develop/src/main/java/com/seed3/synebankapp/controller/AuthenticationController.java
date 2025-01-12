package com.seed3.synebankapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seed3.synebankapp.model.User;
import com.seed3.synebankapp.service.UserService;
import com.seed3.synebankapp.util.JwtUtility;
import com.seed3.synebankapp.util.LoginRequest;

/*
 * Controller is used for verifying users
 * when signing in and performing actions that require authentication
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private JwtUtility jwtUtil;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * Method checks if a user has an account
     * when attempting to login
     * @param loginRequest
     * @return response object
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        System.out.println("Attempting to login");

        try {

            User user = userService.findByUsername(loginRequest.getUsername());

            //Checking if the username exists or if password doesn't match
            if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            } else {

                String jwt = jwtUtil.generateToken(loginRequest.getUsername());
                return ResponseEntity.ok(jwt);

            }

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

}
