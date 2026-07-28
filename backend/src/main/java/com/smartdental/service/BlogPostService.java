package com.smartdental.service;

import com.smartdental.dto.BlogPostRequest;
import com.smartdental.dto.BlogPostResponse;
import com.smartdental.entity.BlogPost;
import com.smartdental.repository.BlogPostRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;
    private final FileStorageService fileStorageService;

    public BlogPostService(BlogPostRepository blogPostRepository,
                            FileStorageService fileStorageService) {
        this.blogPostRepository = blogPostRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<BlogPostResponse> getAllPosts() {
        return blogPostRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public BlogPostResponse getPostById(Long id) {
        BlogPost post = findOrThrow(id);
        return toResponse(post);
    }

    public BlogPostResponse createPost(BlogPostRequest request, MultipartFile image) {
        BlogPost post = new BlogPost();
        post.setCategory(request.getCategory());
        post.setDate(request.getDate());
        post.setTitle(request.getTitle());
        post.setExcerpt(request.getExcerpt());
        post.setImageUrl(fileStorageService.storeImage(image));

        return toResponse(blogPostRepository.save(post));
    }

    public BlogPostResponse updatePost(Long id, BlogPostRequest request, MultipartFile image) {
        BlogPost post = findOrThrow(id);

        post.setCategory(request.getCategory());
        post.setDate(request.getDate());
        post.setTitle(request.getTitle());
        post.setExcerpt(request.getExcerpt());

        if (image != null && !image.isEmpty()) {
            fileStorageService.deleteImage(post.getImageUrl());
            post.setImageUrl(fileStorageService.storeImage(image));
        }

        return toResponse(blogPostRepository.save(post));
    }

    public void deletePost(Long id) {
        BlogPost post = findOrThrow(id);
        fileStorageService.deleteImage(post.getImageUrl());
        blogPostRepository.delete(post);
    }

    private BlogPost findOrThrow(Long id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
    }

    private BlogPostResponse toResponse(BlogPost post) {
        return new BlogPostResponse(
                post.getId(),
                post.getImageUrl(),
                post.getCategory(),
                post.getDate(),
                post.getTitle(),
                post.getExcerpt()
        );
    }
}