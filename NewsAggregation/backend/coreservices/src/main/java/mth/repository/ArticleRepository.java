package mth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import mth.models.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByStatus(String status);

    List<Article> findByStatusOrderByCreatedAtDesc(String status);

    List<Article> findByTrendingTrueOrderByPopularityScoreDesc();

    List<Article> findTop5ByOrderByViewsDesc();

    List<Article> findTop5ByOrderBySharesDesc();

    List<Article> findTop5ByOrderByPopularityScoreDesc();

    @Query("select a.category, count(a) from Article a group by a.category order by count(a) desc")
    List<Object[]> findTrendingCategories();
}
