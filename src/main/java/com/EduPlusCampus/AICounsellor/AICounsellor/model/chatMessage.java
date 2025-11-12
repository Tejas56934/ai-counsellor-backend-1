package com.EduPlusCampus.AICounsellor.AICounsellor.model;

import jakarta.validation.constraints.NotBlank;

public class chatMessage {

    @NotBlank(message = "message is required")
    private String message;

    private String context;



    public chatMessage(String message, String context) {
        this.message = message;
        this.context = context;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }
}
