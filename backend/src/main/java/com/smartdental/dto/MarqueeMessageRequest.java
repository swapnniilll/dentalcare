package com.smartdental.dto;

public class MarqueeMessageRequest {

    private String emojiStart;
    private String message;
    private String highlightText;
    private String emojiEnd;
    private Integer displayOrder;
    private Boolean active;

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