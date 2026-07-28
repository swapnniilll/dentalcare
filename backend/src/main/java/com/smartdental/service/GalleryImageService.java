package com.smartdental.service;

import com.smartdental.dto.GalleryImageRequest;
import com.smartdental.dto.GalleryImageResponse;
import com.smartdental.entity.GalleryImage;
import com.smartdental.repository.GalleryImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GalleryImageService {

    private final GalleryImageRepository galleryImageRepository;
    private final FileStorageService fileStorageService;

    public GalleryImageService(GalleryImageRepository galleryImageRepository,
                                FileStorageService fileStorageService) {
        this.galleryImageRepository = galleryImageRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<GalleryImageResponse> getAllImages() {
        return galleryImageRepository.findAllByOrderByDisplayOrderAscIdAsc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public GalleryImageResponse createImage(GalleryImageRequest request, MultipartFile image) {
        GalleryImage entity = new GalleryImage();
        entity.setTitle(request.getTitle());
        entity.setSubtitle(request.getSubtitle());
        entity.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        entity.setImageUrl(fileStorageService.storeImage(image, "gallery"));

        return toResponse(galleryImageRepository.save(entity));
    }

    public GalleryImageResponse updateImage(Long id, GalleryImageRequest request, MultipartFile image) {
        GalleryImage entity = findOrThrow(id);

        entity.setTitle(request.getTitle());
        entity.setSubtitle(request.getSubtitle());
        if (request.getDisplayOrder() != null) {
            entity.setDisplayOrder(request.getDisplayOrder());
        }

        if (image != null && !image.isEmpty()) {
            fileStorageService.deleteImage(entity.getImageUrl());
            entity.setImageUrl(fileStorageService.storeImage(image, "gallery"));
        }

        return toResponse(galleryImageRepository.save(entity));
    }

    public void deleteImage(Long id) {
        GalleryImage entity = findOrThrow(id);
        fileStorageService.deleteImage(entity.getImageUrl());
        galleryImageRepository.delete(entity);
    }

    private GalleryImage findOrThrow(Long id) {
        return galleryImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery image not found with id: " + id));
    }

    private GalleryImageResponse toResponse(GalleryImage entity) {
        return new GalleryImageResponse(
                entity.getId(),
                entity.getImageUrl(),
                entity.getTitle(),
                entity.getSubtitle(),
                entity.getDisplayOrder()
        );
    }
}