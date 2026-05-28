package mth.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Article;
import mth.models.Share;
import mth.models.Users;
import mth.repository.ArticleRepository;
import mth.repository.ShareRepository;

@Service
public class ShareService {

    @Autowired
    private ShareRepository shareRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public Share recordShare(Share share) {
        share.setSharedAt(LocalDateTime.now());
        Share saved = shareRepository.save(share);
        if (saved.getArticle() != null) {
            Article article = saved.getArticle();
            article.setShares(article.getShares() + 1);
            article.setPopularityScore(article.getPopularityScore() + 5);
            articleRepository.save(article);
        }
        return saved;
    }

    public long countByPlatform(String platform) {
        return shareRepository.countByPlatform(platform);
    }

    public List<Object[]> platformBreakdown() {
        return shareRepository.countByPlatformGroup();
    }

    public List<Object[]> topSharedArticles() {
        return shareRepository.topSharedArticles();
    }

    public Map<String, Long> getShareSummary() {
        return platformBreakdown().stream()
                .collect(Collectors.toMap(row -> row[0].toString(), row -> (Long) row[1]));
    }
}
