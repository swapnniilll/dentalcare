package com.smartdental.dto;

import java.time.LocalDate;

public class BlogPostResponse {

    private Long id;
    private String imageUrl;
    private String category;
    private LocalDate date;
    private String title;
    private String excerpt;

    public BlogPostResponse() {}

    public BlogPostResponse(Long id, String imageUrl, String category,
                             LocalDate date, String title, String excerpt) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.category = category;
        this.date = date;
        this.title = title;
        this.excerpt = excerpt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
}