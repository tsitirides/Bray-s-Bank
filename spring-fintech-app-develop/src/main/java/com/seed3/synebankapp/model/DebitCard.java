package com.seed3.synebankapp.model;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Debit_Cards")
public class DebitCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_ID")
    private int cardId;

    @ManyToOne
    @JoinColumn(name = "account_ID", nullable = false, columnDefinition = "DATE")
    private Account account;

    @Column(name = "expiration_date", columnDefinition = "DATE")
    private LocalDate expirationDate;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "replacement_reason")
    private String replacementReason;

    // Enum for status
    public enum Status {
        ACTIVE,
        INACTIVE,
        LOST,
        STOLEN,
        EXPIRED
    }

    // Constructors, getters, and setters
    public DebitCard() {
    }

    public int getCardId() {
        return cardId;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getReplacementReason() {
        return replacementReason;
    }

    public void setReplacementReason(String replacementReason) {
        this.replacementReason = replacementReason;
    }
}
