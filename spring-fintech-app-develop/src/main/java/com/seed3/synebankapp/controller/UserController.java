package com.seed3.synebankapp.controller;

import java.math.BigDecimal;
import java.security.SecureRandom;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seed3.synebankapp.model.Account;
import com.seed3.synebankapp.model.Checking;
import com.seed3.synebankapp.model.User;
import com.seed3.synebankapp.service.AccountService;
import com.seed3.synebankapp.service.UserService;

@RestController
@RequestMapping("")
public class UserController {

    private final UserService userService;
    private final AccountService accountService;

    public UserController(UserService userService, AccountService accountService) {
        this.userService = userService;
        this.accountService = accountService; // Inject AccountService
    }

        // Method to generate a random 16-digit account number
    private String generateRandomAccountNumber() {
        SecureRandom random = new SecureRandom();
        StringBuilder accountNumber = new StringBuilder(16);
        for (int i = 0; i < 16; i++) {
            accountNumber.append(random.nextInt(10)); // Append a random digit between 0 and 9
        }
        return accountNumber.toString();
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {

        System.out.println("Login input:");
        System.out.println("Username: " + user.getUsername());
        System.out.println("Password: " + user.getPassword());

        // Respond with a success message
        return ResponseEntity.status(HttpStatus.CREATED).body("User login successfully");
    }

    @PostMapping("/signup") // Create account endpoint
    public ResponseEntity<String> createUser(@RequestBody User user) {
        System.out.println("Registering input:");

        // UserService userService = context.getBean(UserService.class); // Get the
        // UserService bean
        userService.createUser(user);
        // Create a default checking account for the user
        Account defaultAccount = new Checking(); // Create a new Checking account
        defaultAccount.setUser(user); // Set the user
        defaultAccount.setBalance(new BigDecimal("0.0")); // Set initial balance to zero
        defaultAccount.setAccountNumber(generateRandomAccountNumber()); // Generate an account number

        // Save the default checking account
        accountService.createAccount(defaultAccount);

        // Output confirmation
        System.out.println("User created: " + user.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

}