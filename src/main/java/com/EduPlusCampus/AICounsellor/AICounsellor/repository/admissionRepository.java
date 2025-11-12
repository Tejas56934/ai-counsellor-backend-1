package com.EduPlusCampus.AICounsellor.AICounsellor.repository;

import com.EduPlusCampus.AICounsellor.AICounsellor.model.admission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface admissionRepository extends JpaRepository<admission, Long> {
    // Add custom queries if required
}
