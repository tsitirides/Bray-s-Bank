package com.seed3.synebankapp.repository;

import com.seed3.synebankapp.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    
    // This method finds all transactions associated with a specific account ID
    List<Transaction> findByaccountID(int accountId); // Keep the underscore in the method name
}