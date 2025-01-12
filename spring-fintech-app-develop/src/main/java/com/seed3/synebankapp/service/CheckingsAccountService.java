package com.seed3.synebankapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seed3.synebankapp.model.Checking;
import com.seed3.synebankapp.repository.CheckingsAccountRepository;
@Service
public class CheckingsAccountService {

    @Autowired
    private CheckingsAccountRepository checkingsAccountRepository;

    public void createCheckings(Checking Checking) {
        checkingsAccountRepository.save(Checking);
    }

    public Checking findCheckingsById(Integer id) {
        return checkingsAccountRepository.findById(id).orElse(null);
    }

    public List<Checking> getAllCheckings() {
        return checkingsAccountRepository.findAll();
    }

    public Checking updateCheckings(Checking Checkings) {
        return checkingsAccountRepository.save(Checkings);
    }

    public void deleteCheckings(Integer id) {
        checkingsAccountRepository.deleteById(id);
    }
}