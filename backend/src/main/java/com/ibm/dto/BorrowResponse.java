package com.ibm.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowResponse {

    private Long id;

    // User Details
    private Long userId;
    private String userName;
    private String userEmail;

    // Book Details
    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private String isbn;

    // Transaction Details
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status;
    private Double fine;
    private boolean isOverdue;
}
