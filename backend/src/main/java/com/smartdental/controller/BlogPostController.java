package com.smartdental.controller;

import com.smartdental.dto.BlogPostRequest;
import com.smartdental.dto.BlogPostResponse;
import com.smartdental.service.BlogPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "*") // tighten this to your frontend origin in production
public class BlogPostController {

    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    // Public: used by your Blog.jsx page
    @GetMapping
    public ResponseEntity<List<BlogPostResponse>> getAllPosts() {
        return ResponseEntity.ok(blogPostService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostResponse> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(blogPostService.getPostById(id));
    }

    // Admin panel: create — multipart form-data (image + text fields)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<BlogPostResponse> createPost(
            @RequestParam("category") String category,
            @RequestParam("date") String date,
            @RequestParam("title") String title,
            @RequestParam("excerpt") String excerpt,
            @RequestParam("image") MultipartFile image) {

        BlogPostRequest request = new BlogPostRequest();
        request.setCategory(category);
        request.setDate(LocalDate.parse(date));
        request.setTitle(title);
        request.setExcerpt(excerpt);

        return ResponseEntity.ok(blogPostService.createPost(request, image));
    }

    // Admin panel: update — image is optional (only send it if replacing)
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<BlogPostResponse> updatePost(
            @PathVariable Long id,
            @RequestParam("category") String category,
            @RequestParam("date") String date,
            @RequestParam("title") String title,
            @RequestParam("excerpt") String excerpt,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        BlogPostRequest request = new BlogPostRequest();
        request.setCategory(category);
        request.setDate(LocalDate.parse(date));
        request.setTitle(title);
        request.setExcerpt(excerpt);

        return ResponseEntity.ok(blogPostService.updatePost(id, request, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        blogPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}