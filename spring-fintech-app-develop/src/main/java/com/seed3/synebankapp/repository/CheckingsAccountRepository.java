package com.seed3.synebankapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.seed3.synebankapp.model.Checking;

/**
 * Interface for Checkings CRUD operations
 */
public interface CheckingsAccountRepository extends JpaRepository<Checking, Integer> {
}