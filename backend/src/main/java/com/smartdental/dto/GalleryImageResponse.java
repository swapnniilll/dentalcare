package com.smartdental.dto;

public class GalleryImageResponse {

    private Long id;
    private String imageUrl;
    private String title;
    private String subtitle;
    private Integer displayOrder;

    public GalleryImageResponse() {}

    public GalleryImageResponse(Long id, String imageUrl, String title,
                                 String subtitle, Integer displayOrder) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.subtitle = subtitle;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}