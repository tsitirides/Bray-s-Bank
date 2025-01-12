package com.seed3.synebankapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.seed3.synebankapp.model.Savings;

/**
 * Interface for Savings CRUD operations
 */
public interface SavingsAccountRepository extends JpaRepository<Savings, Integer> {
}