package com.seed3.synebankapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seed3.synebankapp.model.Savings;
import com.seed3.synebankapp.repository.SavingsAccountRepository;
@Service
public class SavingsAccountService {

    @Autowired
    private SavingsAccountRepository savingsAccountRepository;

    public void createSavings(Savings Savings) {
        savingsAccountRepository.save(Savings);
    }

    public Savings findSavingsById(Integer id) {
        return savingsAccountRepository.findById(id).orElse(null);
    }

    public List<Savings> getAllSavingss() {
        return savingsAccountRepository.findAll();
    }

    public Savings updateSavings(Savings Savings) {
        return savingsAccountRepository.save(Savings);
    }

    public void deleteSavings(Integer id) {
        savingsAccountRepository.deleteById(id);
    }
}