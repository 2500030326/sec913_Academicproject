package mth.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Article;
import mth.repository.ArticleRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ExternalNewsService externalNewsService;

    public List<Article> listAll() {
        List<Article> externalArticles = externalNewsService.fetchTopHeadlines();
        return externalArticles.isEmpty() ? articleRepository.findAll() : externalArticles;
    }

    public List<Article> listPublished() {
        List<Article> externalArticles = externalNewsService.fetchTopHeadlines();
        return externalArticles.isEmpty() ? articleRepository.findByStatusOrderByCreatedAtDesc("PUBLISHED") : externalArticles;
    }

    public Optional<Article> findById(Long id) {
        return articleRepository.findById(id).or(() -> externalNewsService.findByExternalId(id));
    }

    public Article createArticle(Article article) {
        article.setCreatedAt(LocalDateTime.now());
        article.setUpdatedAt(LocalDateTime.now());
        article.setStatus((article.getStatus() == null || article.getStatus().isBlank()) ? "PUBLISHED" : article.getStatus());
        article.setViews(article.getViews());
        article.setLikes(article.getLikes());
        article.setShares(0);
        article.setBookmarks(0);
        article.setPopularityScore(article.getAiScore());
        article.setAiScore(article.getAiScore());
        article.setSentiment((article.getSentiment() == null || article.getSentiment().isBlank()) ? "Positive" : article.getSentiment());
        return articleRepository.save(article);
    }

    public Article updateArticle(Long id, Article payload) {
        Article existing = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        existing.setTitle(payload.getTitle());
        existing.setAuthor(payload.getAuthor());
        existing.setCategory(payload.getCategory());
        existing.setStatus(payload.getStatus());
        existing.setTags(payload.getTags());
        existing.setImageUrl(payload.getImageUrl());
        existing.setSummary(payload.getSummary());
        existing.setContent(payload.getContent());
        existing.setBreaking(payload.isBreaking());
        existing.setTrending(payload.isTrending());
        existing.setFeatured(payload.isFeatured());
        existing.setLikes(payload.getLikes());
        existing.setAiScore(payload.getAiScore());
        existing.setSentiment(payload.getSentiment());
        existing.setUpdatedAt(LocalDateTime.now());
        return articleRepository.save(existing);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    public Article updateStatus(Long id, String status) {
        Article existing = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        existing.setStatus(status);
        existing.setUpdatedAt(LocalDateTime.now());
        return articleRepository.save(existing);
    }

    public Article markBreaking(Long id, boolean breaking) {
        Article existing = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        existing.setBreaking(breaking);
        existing.setUpdatedAt(LocalDateTime.now());
        return articleRepository.save(existing);
    }

    public Article incrementViews(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        article.setViews(article.getViews() + 1);
        article.setPopularityScore(article.getPopularityScore() + 2);
        return articleRepository.save(article);
    }

    public Article incrementShares(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        article.setShares(article.getShares() + 1);
        article.setPopularityScore(article.getPopularityScore() + 3);
        return articleRepository.save(article);
    }
}
