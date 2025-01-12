package com.seed3.synebankapp.service;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seed3.synebankapp.model.Account;
import com.seed3.synebankapp.repository.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;
    

    public Account createAccount(Account account) {
        account.setBalance(new BigDecimal("0.00"));
        return accountRepository.save(account);
    }

    public Account findAccountById(Integer id) {
        return accountRepository.findById(id).orElse(null);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account updateAccount(Account Account) {
        return accountRepository.save(Account);
    }

    public void deleteAccount(Integer id) {
        accountRepository.deleteById(id);
    }

    public List<Account> findAccountByUserId(Integer user_id) {
        return accountRepository.findByUser_UserId(user_id);
    }
}
