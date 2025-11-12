package com.EduPlusCampus.AICounsellor.AICounsellor.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;


@Service
public class GeminiClient {

    private static final String GEMINI_API_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent";

    private final String apiKey;
    private final HttpClient httpClient;

    public GeminiClient(@Value("${gemini.api.key:}") String apiKey) {
        // apiKey is injected from application.properties or environment variable GEMINI_API_KEY
        this.apiKey = apiKey;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    /**
     * Send prompt and return the generated text.
     * Throws runtime exception for errors (controller/handler will convert to proper response).
     */
    public String generate(String prompt) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Gemini API key is not configured. Set environment variable GEMINI_API_KEY.");
        }

        try {
            JSONObject body = new JSONObject()
                    .put("contents", new JSONArray()
                            .put(new JSONObject()
                                    .put("role", "user")
                                    .put("parts", new JSONArray()
                                            .put(new JSONObject().put("text", prompt)))));


            // You can pass API key either as query param or using x-goog-api-key header (we will use query param here)
            String uri = GEMINI_API_URL + "?key=" + apiKey;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(uri))
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(30))
                    .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            int status = response.statusCode();
            String respBody = response.body();

            if (status == 200) {
                JSONObject json = new JSONObject(respBody);
                // defensive parsing
                if (json.has("candidates")) {
                    var cand = json.getJSONArray("candidates").getJSONObject(0);
                    if (cand.has("content")) {
                        var content = cand.getJSONObject("content");
                        if (content.has("parts")) {
                            return content.getJSONArray("parts").getJSONObject(0).getString("text").trim();
                        }
                    }
                }
                // fallback: return raw response if structure changed
                return respBody;
            } else {
                throw new RuntimeException("Gemini API returned status " + status + ": " + respBody);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to call Gemini API: " + e.getMessage(), e);
        }
    }
}
