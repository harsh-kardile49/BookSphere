package com.ibm.controller;

import com.ibm.dto.ReportSummaryDTO;
import com.ibm.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/summary")
    public ResponseEntity<ReportSummaryDTO> getReportSummary() {
        return ResponseEntity.ok(reportService.getReportSummary());
    }
}
