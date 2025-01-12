package com.seed3.synebankapp.controller;
import com.seed3.synebankapp.model.AccountTypes;


public class AccCrReq {
    private AccountTypes accountType;

    // Getter and Setter
    public AccountTypes getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountTypes accountType) {
        this.accountType = accountType;
    }
}
