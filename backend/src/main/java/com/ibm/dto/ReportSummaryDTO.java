package com.ibm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportSummaryDTO {
    private long totalBooks;
    private long totalMembers;
    private long totalTransactions;
    private long activeLoans;
    private long returnedLoans;
    private long overdueLoans;
    private double totalFines;
    private Map<String, Long> categoryDistribution;
}
