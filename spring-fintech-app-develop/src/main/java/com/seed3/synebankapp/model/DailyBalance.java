package com.seed3.synebankapp.model;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Daily_Balances")
public class DailyBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "balance_ID")
    private int balanceId;

    @Column(name = "todays_balance", nullable = false, precision = 10, scale = 2)
    private BigDecimal todaysBalance;

    @Column(name = "balance_date", nullable = false)
    private Date balanceDate;

    @ManyToOne
    @JoinColumn(name = "account_ID", nullable = false)
    private Account account;

    public DailyBalance() {
    }

    public int getBalanceId() {
        return balanceId;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccountId(Account account) {
        this.account = account;
    }

    public BigDecimal getTodaysBalance() {
        return todaysBalance;
    }

    public void setTodaysBalance(BigDecimal todaysBalance) {
        this.todaysBalance = todaysBalance;
    }

    public Date getBalanceDate() {
        return balanceDate;
    }

    public void setBalanceDate(Date balanceDate) {
        this.balanceDate = balanceDate;
    }
}
