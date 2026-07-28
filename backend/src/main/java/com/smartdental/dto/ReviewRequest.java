package com.smartdental.dto;

public class ReviewRequest {

    private String name;
    private String role;
    private String reviewText;
    private Integer rating;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
}