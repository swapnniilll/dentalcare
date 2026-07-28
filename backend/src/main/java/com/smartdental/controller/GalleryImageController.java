package com.smartdental.controller;

import com.smartdental.dto.GalleryImageRequest;
import com.smartdental.dto.GalleryImageResponse;
import com.smartdental.service.GalleryImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*") // tighten to your frontend origin in production
public class GalleryImageController {

    private final GalleryImageService galleryImageService;

    public GalleryImageController(GalleryImageService galleryImageService) {
        this.galleryImageService = galleryImageService;
    }

    @GetMapping
    public ResponseEntity<List<GalleryImageResponse>> getAllImages() {
        return ResponseEntity.ok(galleryImageService.getAllImages());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<GalleryImageResponse> createImage(
            @RequestParam("title") String title,
            @RequestParam("subtitle") String subtitle,
            @RequestParam(value = "displayOrder", required = false) Integer displayOrder,
            @RequestParam("image") MultipartFile image) {

        GalleryImageRequest request = new GalleryImageRequest();
        request.setTitle(title);
        request.setSubtitle(subtitle);
        request.setDisplayOrder(displayOrder);

        return ResponseEntity.ok(galleryImageService.createImage(request, image));
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<GalleryImageResponse> updateImage(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("subtitle") String subtitle,
            @RequestParam(value = "displayOrder", required = false) Integer displayOrder,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        GalleryImageRequest request = new GalleryImageRequest();
        request.setTitle(title);
        request.setSubtitle(subtitle);
        request.setDisplayOrder(displayOrder);

        return ResponseEntity.ok(galleryImageService.updateImage(id, request, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        galleryImageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}