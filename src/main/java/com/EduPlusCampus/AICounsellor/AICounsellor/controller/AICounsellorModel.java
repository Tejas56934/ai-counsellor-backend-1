package com.EduPlusCampus.AICounsellor.AICounsellor.controller;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.List;
import java.util.Map;

@Service
public class AICounsellorModel {

    private static final String RASA_URL = "http://localhost:5005/webhooks/rest/webhook";

    public String askCounsellor(String message, String context) {

        RestTemplate rest = new RestTemplate();

        // Build Rasa request
        Map<String, String> payload = Map.of(
                "sender", "user",
                "message", message
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> req = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<List> response =
                    rest.exchange(RASA_URL, HttpMethod.POST, req, List.class);

            if(response.getBody() != null && !response.getBody().isEmpty()) {
                Map rasaMsg = (Map) response.getBody().get(0);
                return String.valueOf(rasaMsg.get("text"));
            }

            return "Sorry, I didn't understand that.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Rasa server error: " + e.getMessage();
        }
    }
}

