package com.smartdental.dto;

public class MarqueeMessageResponse {

    private Long id;
    private String emojiStart;
    private String message;
    private String highlightText;
    private String emojiEnd;
    private Integer displayOrder;
    private Boolean active;

    public MarqueeMessageResponse() {}

    public MarqueeMessageResponse(Long id, String emojiStart, String message,
                                   String highlightText, String emojiEnd,
                                   Integer displayOrder, Boolean active) {
        this.id = id;
        this.emojiStart = emojiStart;
        this.message = message;
        this.highlightText = highlightText;
        this.emojiEnd = emojiEnd;
        this.displayOrder = displayOrder;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmojiStart() { return emojiStart; }
    public void setEmojiStart(String emojiStart) { this.emojiStart = emojiStart; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getHighlightText() { return highlightText; }
    public void setHighlightText(String highlightText) { this.highlightText = highlightText; }

    public String getEmojiEnd() { return emojiEnd; }
    public void setEmojiEnd(String emojiEnd) { this.emojiEnd = emojiEnd; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}