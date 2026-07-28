package com.smartdental.dto;

public class ChatbotFaqResponse {

    private Long id;
    private String keywords;
    private String answer;

    public ChatbotFaqResponse() {}

    public ChatbotFaqResponse(Long id, String keywords, String answer) {
        this.id = id;
        this.keywords = keywords;
        this.answer = answer;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getKeywords() { return keywords; }
    public void setKeywords(String keywords) { this.keywords = keywords; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
}