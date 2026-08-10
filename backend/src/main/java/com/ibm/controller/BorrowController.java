package com.ibm.controller;

import com.ibm.dto.BorrowRequest;
import com.ibm.dto.BorrowResponse;
import com.ibm.service.BorrowService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/borrow")
@RequiredArgsConstructor
public class BorrowController {

    private final BorrowService borrowService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BorrowResponse issueBook(@Valid @RequestBody BorrowRequest request) {
        return borrowService.issueBook(request);
    }

    @GetMapping
    public List<BorrowResponse> getAllBorrows() {
        return borrowService.getAllBorrows();
    }

    @GetMapping("/active")
    public List<BorrowResponse> getActiveBorrows() {
        return borrowService.getActiveBorrows();
    }

    @PutMapping("/{id}/return")
    public BorrowResponse returnBook(@PathVariable Long id) {
        return borrowService.returnBook(id);
    }
}
