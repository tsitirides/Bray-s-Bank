package com.seed3.synebankapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.seed3.synebankapp.model.Account;
/**
 * Interface for Account CRUD operations
 */
public interface AccountRepository extends JpaRepository<Account, Integer> {
    List<Account> findByUser_UserId(Integer userId);    
}

