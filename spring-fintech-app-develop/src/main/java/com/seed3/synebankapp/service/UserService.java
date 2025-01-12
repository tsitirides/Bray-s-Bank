package com.seed3.synebankapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seed3.synebankapp.model.User;
import com.seed3.synebankapp.repository.UserRepository;

import java.util.Base64; 

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public void createUser(User user) {

        // Hash the password
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Hash the SIN number using Base64 encoding (or any preferred hashing mechanism)
        String hashedSin = Base64.getEncoder().encodeToString(user.getSinNumber().getBytes());
        user.setSinNumber(hashedSin);

        // Save the user to the repository
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}