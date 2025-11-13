package com.EduPlusCampus.AICounsellor.AICounsellor.controller;

import com.EduPlusCampus.AICounsellor.AICounsellor.model.admission;
import com.EduPlusCampus.AICounsellor.AICounsellor.repository.admissionRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admission")
@Validated
public class admissionController {

    private final admissionRepository admissionRepository;

    public admissionController(admissionRepository admissionRepository) {
        this.admissionRepository = admissionRepository;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@Valid @RequestBody admission admission) {
        var saved = admissionRepository.save(admission);
        // In production return a secure token or ID — do not return any secrets
        return ResponseEntity.ok().body(
                java.util.Map.of("status","success", "id", saved.getId(), "message","Admission submitted")
        );
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        // Basic check to confirm DB connectivity
        long count = admissionRepository.count();
        return ResponseEntity.ok(java.util.Map.of("status","ok", "admissions_count", count));
    }
}
