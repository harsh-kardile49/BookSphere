package com.ibm.service;

import com.ibm.dto.BorrowRequest;
import com.ibm.dto.BorrowResponse;
import com.ibm.entity.Book;
import com.ibm.entity.BorrowTransaction;
import com.ibm.entity.User;
import com.ibm.exception.BookNotFoundException;
import com.ibm.exception.UserNotFoundException;
import com.ibm.repository.BookRepository;
import com.ibm.repository.BorrowRepository;
import com.ibm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BorrowServiceImpl implements BorrowService {

    private final BorrowRepository borrowRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public BorrowResponse issueBook(BorrowRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + request.getUserId()));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new BookNotFoundException(request.getBookId()));

        if (book.getQuantity() == null || book.getQuantity() <= 0) {
            throw new RuntimeException("Book '" + book.getTitle() + "' is currently out of stock.");
        }

        // Decrement book inventory stock
        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        LocalDate today = LocalDate.now();
        LocalDate dueDate = request.getDueDate() != null ? request.getDueDate() : today.plusDays(14);

        BorrowTransaction transaction = BorrowTransaction.builder()
                .user(user)
                .book(book)
                .borrowDate(today)
                .dueDate(dueDate)
                .returnDate(null)
                .status("ACTIVE")
                .fine(0.0)
                .build();

        BorrowTransaction saved = borrowRepository.save(transaction);
        return mapToResponse(saved);
    }

    @Override
    public List<BorrowResponse> getAllBorrows() {
        return borrowRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BorrowResponse> getActiveBorrows() {
        return borrowRepository.findByStatus("ACTIVE")
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BorrowResponse returnBook(Long borrowId) {
        BorrowTransaction transaction = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow transaction not found with id: " + borrowId));

        if ("RETURNED".equalsIgnoreCase(transaction.getStatus())) {
            return mapToResponse(transaction);
        }

        LocalDate today = LocalDate.now();
        transaction.setReturnDate(today);
        transaction.setStatus("RETURNED");

        // Increment book inventory stock back
        Book book = transaction.getBook();
        if (book != null) {
            book.setQuantity((book.getQuantity() != null ? book.getQuantity() : 0) + 1);
            bookRepository.save(book);
        }

        BorrowTransaction updated = borrowRepository.save(transaction);
        return mapToResponse(updated);
    }

    private BorrowResponse mapToResponse(BorrowTransaction t) {
        boolean overdue = false;
        if ("ACTIVE".equalsIgnoreCase(t.getStatus()) && t.getDueDate() != null) {
            overdue = LocalDate.now().isAfter(t.getDueDate());
        }

        return BorrowResponse.builder()
                .id(t.getId())
                .userId(t.getUser() != null ? t.getUser().getId() : null)
                .userName(t.getUser() != null ? t.getUser().getFirstName() + " " + t.getUser().getLastName() : "Unknown")
                .userEmail(t.getUser() != null ? t.getUser().getEmail() : "")
                .bookId(t.getBook() != null ? t.getBook().getId() : null)
                .bookTitle(t.getBook() != null ? t.getBook().getTitle() : "Unknown Book")
                .bookAuthor(t.getBook() != null ? t.getBook().getAuthor() : "Unknown Author")
                .isbn(t.getBook() != null ? t.getBook().getIsbn() : "")
                .borrowDate(t.getBorrowDate())
                .dueDate(t.getDueDate())
                .returnDate(t.getReturnDate())
                .status(t.getStatus())
                .fine(t.getFine() != null ? t.getFine() : 0.0)
                .isOverdue(overdue)
                .build();
    }
}
