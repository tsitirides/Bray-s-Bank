package com.seed3.synebankapp.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Overdraft_Protection")
public class OverdraftProtection {

    @Id
    @Column(name = "account_ID")
    private int accountId;

    @Column(name = "overdraft_limit", precision = 15, scale = 2)
    private BigDecimal overdraftLimit;

    @Column(name = "overdraft_fee", precision = 10, scale = 2)
    private BigDecimal overdraftFee;

    @OneToOne
    @MapsId
    @JoinColumn(name = "account_ID")
    private Checking checkings;

    // Constructors, getters, and setters
    public OverdraftProtection() {
    }

    public OverdraftProtection(BigDecimal overdraftLimit, BigDecimal overdraftFee) {
        this.overdraftLimit = overdraftLimit;
        this.overdraftFee = overdraftFee;
    }

    public int getAccountId() {
        return accountId;
    }

    public BigDecimal getOverdraftLimit() {
        return overdraftLimit;
    }

    public void setOverdraftLimit(BigDecimal overdraftLimit) {
        this.overdraftLimit = overdraftLimit;
    }

    public BigDecimal getOverdraftFee() {
        return overdraftFee;
    }

    public void setOverdraftFee(BigDecimal overdraftFee) {
        this.overdraftFee = overdraftFee;
    }

    public Checking getCheckings() {
        return checkings;
    }

    public void setCheckings(Checking checkings) {
        this.checkings = checkings;
    }
}
