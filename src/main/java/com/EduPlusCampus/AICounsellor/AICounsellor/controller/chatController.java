package com.EduPlusCampus.AICounsellor.AICounsellor.controller;

import com.EduPlusCampus.AICounsellor.AICounsellor.model.chatMessage;
import com.EduPlusCampus.AICounsellor.AICounsellor.controller.AICounsellorModel;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * Chat endpoints. This controller never exposes the API key.
 */
@RestController
@RequestMapping("/api/chat")
@Validated
// restrict origins in production to the actual front-end domain, e.g. "https://yourfrontend.example"
@CrossOrigin(origins = "http://localhost:5173", originPatterns = "https://ai-counsellor-ioxq89tqt-tejas-projects-f7079041.vercel.app")
public class chatController {

    private final AICounsellorModel aiService;

    public chatController(AICounsellorModel aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ask")
    public ResponseEntity<?> ask(@Valid @RequestBody chatMessage request) {
        String reply = aiService.askCounsellor(request.getMessage(), request.getContext());
        return ResponseEntity.ok().body(reply);
    }
}
