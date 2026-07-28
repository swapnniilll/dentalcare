package com.smartdental.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir:uploads}")
    private String baseUploadDir;

    // Backward-compatible overload — defaults to "blog" subfolder
    public String storeImage(MultipartFile file) {
        return storeImage(file, "blog");
    }

    public String storeImage(MultipartFile file, String subfolder) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("No image file provided");
        }
        try {
            Path uploadPath = Paths.get(baseUploadDir, subfolder);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalName = file.getOriginalFilename();
            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID() + extension;

            Path targetPath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + subfolder + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image: " + e.getMessage(), e);
        }
    }

    public void deleteImage(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return;
        try {
            // imageUrl looks like /uploads/blog/xyz.jpg or /uploads/gallery/xyz.jpg
            String relativePath = imageUrl.replaceFirst("^/uploads/", "");
            Path path = Paths.get(baseUploadDir).resolve(relativePath);
            Files.deleteIfExists(path);
        } catch (IOException ignored) {
        }
    }
}