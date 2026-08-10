package com.ibm.service;

import com.ibm.dto.BorrowRequest;
import com.ibm.dto.BorrowResponse;

import java.util.List;

public interface BorrowService {

    BorrowResponse issueBook(BorrowRequest request);

    List<BorrowResponse> getAllBorrows();

    List<BorrowResponse> getActiveBorrows();

    BorrowResponse returnBook(Long borrowId);
}
