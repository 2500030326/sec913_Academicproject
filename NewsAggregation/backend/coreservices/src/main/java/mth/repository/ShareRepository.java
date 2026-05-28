package mth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import mth.models.Share;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {

    long countByPlatform(String platform);

    @Query("select s.platform, count(s) from Share s group by s.platform order by count(s) desc")
    List<Object[]> countByPlatformGroup();

    @Query("select s.article.id, count(s) from Share s group by s.article.id order by count(s) desc")
    List<Object[]> topSharedArticles();
}
