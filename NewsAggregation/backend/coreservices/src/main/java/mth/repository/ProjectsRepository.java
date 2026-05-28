package mth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mth.models.Projects;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Long> {
}
