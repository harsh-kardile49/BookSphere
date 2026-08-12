package com.ibm.service;

import com.ibm.dto.ReportSummaryDTO;
import com.ibm.entity.Book;
import com.ibm.entity.BorrowTransaction;
import com.ibm.entity.Role;
import com.ibm.repository.BookRepository;
import com.ibm.repository.BorrowRepository;
import com.ibm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportServiceImpl implements ReportService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BorrowRepository borrowRepository;

    public ReportServiceImpl(BookRepository bookRepository,
                             UserRepository userRepository,
                             BorrowRepository borrowRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.borrowRepository = borrowRepository;
    }

    @Override
    public ReportSummaryDTO getReportSummary() {
        long totalBooks = bookRepository.count();
        long totalMembers = userRepository.findAll().stream()
                .filter(u -> u.getRole() != Role.ADMIN && u.getRole() != Role.LIBRARIAN)
                .count();

        List<BorrowTransaction> transactions = borrowRepository.findAll();
        long totalTransactions = transactions.size();

        long activeLoans = 0;
        long returnedLoans = 0;
        long overdueLoans = 0;
        double totalFines = 0.0;

        LocalDate today = LocalDate.now();

        for (BorrowTransaction t : transactions) {
            if ("ACTIVE".equalsIgnoreCase(t.getStatus())) {
                activeLoans++;
                if (t.getDueDate() != null && today.isAfter(t.getDueDate())) {
                    overdueLoans++;
                }
            } else if ("RETURNED".equalsIgnoreCase(t.getStatus())) {
                returnedLoans++;
            }

            if (t.getFine() != null) {
                totalFines += t.getFine();
            }
        }

        // Category breakdown
        Map<String, Long> categoryMap = new HashMap<>();
        List<Book> books = bookRepository.findAll();
        for (Book b : books) {
            String category = b.getCategory() != null && !b.getCategory().trim().isEmpty()
                    ? b.getCategory().trim()
                    : "General";
            categoryMap.put(category, categoryMap.getOrDefault(category, 0L) + 1);
        }

        return ReportSummaryDTO.builder()
                .totalBooks(totalBooks)
                .totalMembers(totalMembers)
                .totalTransactions(totalTransactions)
                .activeLoans(activeLoans)
                .returnedLoans(returnedLoans)
                .overdueLoans(overdueLoans)
                .totalFines(totalFines)
                .categoryDistribution(categoryMap)
                .build();
    }
}
