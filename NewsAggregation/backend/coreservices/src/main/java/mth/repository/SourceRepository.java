package mth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mth.models.Source;

@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {
}
