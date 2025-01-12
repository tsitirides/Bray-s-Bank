package com.seed3.synebankapp.model;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("CHECKING")
@Table(name = "Checkings")
public class Checking extends Account {

    @Column(name = "direct_deposit_status", nullable = false)
    private boolean directDepositStatus;

    @Column(name = "maintenance_fee", precision = 5, scale = 2)
    private BigDecimal maintenanceFee;

    // Constructors, getters, and setters
    public Checking() {
    }

    public Checking(boolean directDepositStatus, BigDecimal maintenanceFee) {
        this.directDepositStatus = directDepositStatus;
        this.maintenanceFee = maintenanceFee;
    }

    public boolean isDirectDepositStatus() {
        return directDepositStatus;
    }

    public void setDirectDepositStatus(boolean directDepositStatus) {
        this.directDepositStatus = directDepositStatus;
    }

    public BigDecimal getMaintenanceFee() {
        return maintenanceFee;
    }

    public void setMaintenanceFee(BigDecimal maintenanceFee) {
        this.maintenanceFee = maintenanceFee;
    }

}
