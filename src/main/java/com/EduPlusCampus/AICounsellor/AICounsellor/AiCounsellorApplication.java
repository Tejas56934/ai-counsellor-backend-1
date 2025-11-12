package com.EduPlusCampus.AICounsellor.AICounsellor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.EduPlusCampus.AICounsellor.AICounsellor.repository"})
@EntityScan(basePackages = {"com.EduPlusCampus.AICounsellor.AICounsellor.model"})
@ComponentScan(basePackages = {"com.EduPlusCampus.AICounsellor.AICounsellor"})
public class AiCounsellorApplication {
    public static void main(String[] args) {
        SpringApplication.run(AiCounsellorApplication.class, args);
    }
}

