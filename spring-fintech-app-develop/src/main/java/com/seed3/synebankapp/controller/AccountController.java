package com.seed3.synebankapp.controller;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seed3.synebankapp.model.Account;
import com.seed3.synebankapp.model.AccountTypes;
import com.seed3.synebankapp.model.Checking;
import com.seed3.synebankapp.model.Savings;
import com.seed3.synebankapp.model.User;
import com.seed3.synebankapp.model.Transaction;

import com.seed3.synebankapp.service.AccountService;
import com.seed3.synebankapp.service.TransactionService;
import com.seed3.synebankapp.service.UserService;
import com.seed3.synebankapp.util.JwtUtility;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    //private final SavingsAccountService savingsAccountService;
    //private final CheckingsAccountService checkingsAccountService;
    private final AccountService accountService;
    private final UserService userService;


    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{accountId}/transactions")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable int accountId) {
        List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId);
        return ResponseEntity.ok(transactions);
    }

    @Autowired
    private JwtUtility jwtUtil;

    public AccountController(AccountService accountService, UserService userService) {
        this.accountService = accountService;
        this.userService = userService;
       // this.savingsAccountService = savingsAccountService;
       // this.checkingsAccountService = checkingsAccountService;
    }   

    @GetMapping("/types")
    public List<AccountTypes> getAccountTypes() {
        
        return Arrays.asList(AccountTypes.values());
    }


    private String generateRandomAccountNumber() {
        SecureRandom random = new SecureRandom();
        StringBuilder accountNumber = new StringBuilder(16);
        for (int i = 0; i < 16; i++) {
            accountNumber.append(random.nextInt(10)); // Append a random digit between 0 and 9
        }
        return accountNumber.toString();
    }
    /*
     * GetAccountsByUser()
     * Fetches all accounts a user owns
     */


    @GetMapping("/user")
    public ResponseEntity<List<Account>> getAccountsByUser(HttpServletRequest request) {
        System.out.println("Authorizing...");
        User user = AuthorizeUser(request);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Account> accounts = accountService.findAccountByUserId(user.getUserId());

        return ResponseEntity.ok(accounts);
    }

    /*
     * Adds ability for a user to open a new account 
     */
    @PostMapping("/create")
    public ResponseEntity<Account> OpenAccount(HttpServletRequest request, @RequestBody AccCrReq accountRequest) {
        System.out.println("Authorizing...");
        User user = AuthorizeUser(request);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Create a new account object
        Account account;

        // Determine the account type from the request and create the appropriate account
        if (accountRequest.getAccountType() == AccountTypes.SAVINGS) {
            Savings savingsAcc = new Savings();
            savingsAcc.setUser(user);
            savingsAcc.setBalance(new BigDecimal("0.0"));
            savingsAcc.setInterestRate(new BigDecimal("1.5"));
            savingsAcc.setAccountNumber(generateRandomAccountNumber());
            account = savingsAcc;
        } else if (accountRequest.getAccountType() == AccountTypes.CHECKING) {
            Checking checkingAcc = new Checking();
            checkingAcc.setUser(user);
            checkingAcc.setBalance(new BigDecimal("0.0"));
            checkingAcc.setDirectDepositStatus(false);
            checkingAcc.setMaintenanceFee(new BigDecimal("0.5"));
            checkingAcc.setAccountNumber(generateRandomAccountNumber());
            account = checkingAcc;
        } else {
            return ResponseEntity.badRequest().body(null); // Invalid account type
        }

        // Save the account using the accountService
        accountService.createAccount(account);
        System.out.println("Account Created Successfully");
        return ResponseEntity.ok(account);
    }


    /*
     * Authenticates User when performing action
     * Making sure their token is valid
     */
    private User AuthorizeUser(HttpServletRequest request) {
        System.out.println("Authorizing...");
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }

        String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        if (username == null || !jwtUtil.validateToken(jwt, username)) {
            return null;
        }

        User user = userService.findByUsername(username);
        if (user == null) {
            return null;
        }

        return user;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccountById(@PathVariable int accountId) {
        Account account = accountService.findAccountById(accountId); // Make sure this method exists
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Handle account not found
        }
        return ResponseEntity.ok(account);
    }
}
