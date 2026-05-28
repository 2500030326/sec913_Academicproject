package mth.services;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.zip.CRC32;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import mth.models.Article;

@Service
public class ExternalNewsService {

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${newsapi.key:}")
    private String apiKey;

    @Value("${newsapi.base-url:https://newsapi.org/v2/top-headlines}")
    private String apiBaseUrl;

    @Value("${newsapi.country:us}")
    private String country;

    @Value("${newsapi.page-size:24}")
    private int pageSize;

    public List<Article> fetchTopHeadlines() {
        if (apiKey == null || apiKey.isBlank()) {
            return List.of();
        }

        try {
            String url = apiBaseUrl
                    + "?country=" + encode(country)
                    + "&pageSize=" + pageSize
                    + "&apiKey=" + encode(apiKey);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                return List.of();
            }

            JsonNode articles = objectMapper.readTree(response.body()).path("articles");
            if (!articles.isArray()) {
                return List.of();
            }

            List<Article> mappedArticles = new ArrayList<>();
            for (JsonNode node : articles) {
                String title = text(node, "title");
                String urlToArticle = text(node, "url");
                if (title.isBlank() || urlToArticle.isBlank()) {
                    continue;
                }
                mappedArticles.add(toArticle(node, "World"));
            }
            return mappedArticles;
        } catch (Exception error) {
            return List.of();
        }
    }

    public Optional<Article> findByExternalId(Long id) {
        return fetchTopHeadlines().stream()
                .filter(article -> article.getId().equals(id))
                .findFirst();
    }

    private Article toArticle(JsonNode node, String category) {
        Article article = new Article();
        String title = text(node, "title");
        String description = text(node, "description");
        String content = text(node, "content");
        String urlToArticle = text(node, "url");
        String imageUrl = text(node, "urlToImage");
        String author = text(node, "author");
        String source = node.path("source").path("name").asText("News API");

        article.setId(externalId(urlToArticle));
        article.setTitle(title);
        article.setAuthor(author.isBlank() ? source : author);
        article.setCategory(category);
        article.setStatus("PUBLISHED");
        article.setTags(source);
        article.setImageUrl(imageUrl);
        article.setSummary(description.isBlank() ? content : description);
        article.setContent((content.isBlank() ? description : content) + "\n\nSource: " + urlToArticle);
        article.setBreaking(true);
        article.setTrending(true);
        article.setFeatured(false);
        article.setViews(0);
        article.setLikes(0);
        article.setShares(0);
        article.setBookmarks(0);
        article.setPopularityScore(92);
        article.setAiScore(92);
        article.setSentiment("Neutral");
        article.setCreatedAt(publishedAt(node));
        article.setUpdatedAt(LocalDateTime.now());
        return article;
    }

    private Long externalId(String url) {
        CRC32 crc32 = new CRC32();
        crc32.update(url.getBytes(StandardCharsets.UTF_8));
        return crc32.getValue();
    }

    private LocalDateTime publishedAt(JsonNode node) {
        String publishedAt = text(node, "publishedAt");
        if (publishedAt.isBlank()) {
            return LocalDateTime.now();
        }
        try {
            return OffsetDateTime.parse(publishedAt).toLocalDateTime();
        } catch (Exception error) {
            return LocalDateTime.now();
        }
    }

    private String text(JsonNode node, String field) {
        JsonNode value = node.path(field);
        if (value.isMissingNode() || value.isNull()) {
            return "";
        }
        return value.asText("");
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
