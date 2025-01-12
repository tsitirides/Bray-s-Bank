package com.seed3.synebankapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seed3.synebankapp.model.User;

/**
 * interface to implement user crud operations
 */
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);
}
