package mth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mth.models.SearchQuery;

@Repository
public interface SearchQueryRepository extends JpaRepository<SearchQuery, Long> {

    @Query("select s from SearchQuery s where lower(s.keyword) = lower(:keyword)")
    Optional<SearchQuery> findByKeyword(@Param("keyword") String keyword);
}
