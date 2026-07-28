package com.smartdental.dto;

import java.time.LocalDateTime;

public class ReviewResponse {

    private Long id;
    private String name;
    private String role;
    private String reviewText;
    private Integer rating;
    private LocalDateTime createdAt;

    public ReviewResponse() {}

    public ReviewResponse(Long id, String name, String role, String reviewText,
                           Integer rating, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.reviewText = reviewText;
        this.rating = rating;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}