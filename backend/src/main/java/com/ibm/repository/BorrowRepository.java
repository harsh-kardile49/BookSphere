package com.ibm.repository;

import com.ibm.entity.BorrowTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<BorrowTransaction, Long> {

    List<BorrowTransaction> findByUserId(Long userId);

    List<BorrowTransaction> findByStatus(String status);
}
