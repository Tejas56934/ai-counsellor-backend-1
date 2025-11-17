package com.EduPlusCampus.AICounsellor.AICounsellor.repository;

import com.EduPlusCampus.AICounsellor.AICounsellor.model.Admission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface admissionRepository extends JpaRepository<Admission, Long> {
    // Add custom queries if required
}
