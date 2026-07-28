package com.smartdental.service;

import com.smartdental.dto.ReviewRequest;
import com.smartdental.dto.ReviewResponse;
import com.smartdental.entity.Review;
import com.smartdental.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ReviewResponse createReview(ReviewRequest request) {
        Review review = new Review();
        review.setName(request.getName());
        review.setRole(request.getRole());
        review.setReviewText(request.getReviewText());
        review.setRating(request.getRating() != null ? request.getRating() : 5);

        return toResponse(reviewRepository.save(review));
    }

    public ReviewResponse updateReview(Long id, ReviewRequest request) {
        Review review = findOrThrow(id);

        review.setName(request.getName());
        review.setRole(request.getRole());
        review.setReviewText(request.getReviewText());
        review.setRating(request.getRating() != null ? request.getRating() : review.getRating());

        return toResponse(reviewRepository.save(review));
    }

    public void deleteReview(Long id) {
        Review review = findOrThrow(id);
        reviewRepository.delete(review);
    }

    private Review findOrThrow(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }

    private ReviewResponse toResponse(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getName(),
                review.getRole(),
                review.getReviewText(),
                review.getRating(),
                review.getCreatedAt()
        );
    }
}