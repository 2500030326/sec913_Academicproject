package mth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mth.models.Tasks;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {
	
	@Query("select T from Tasks T where T.assignedto = :userid or T.id in (select id from Tasks)")
	public List<Tasks> findByAssignedto(@Param("userid") Long userid);

	@Query("select T from Tasks T where T.assignedto = :userid")
	public List<Tasks> findAssignedToUser(@Param("userid") Long userid);
	
	@Query("select T from Tasks T")
	public List<Tasks> findAllTasks();
}
