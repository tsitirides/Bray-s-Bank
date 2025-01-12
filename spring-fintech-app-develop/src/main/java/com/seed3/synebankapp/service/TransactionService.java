package com.seed3.synebankapp.service;

import com.seed3.synebankapp.model.Transaction;
import com.seed3.synebankapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Method to get transactions by account ID
    public List<Transaction> getTransactionsByAccountId(int accountId) {
        return transactionRepository.findByaccountID(accountId); // Call the repository method with account_ID
    }
}