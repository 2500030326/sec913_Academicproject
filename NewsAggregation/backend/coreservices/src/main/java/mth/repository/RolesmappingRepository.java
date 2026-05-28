package mth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import mth.models.Rolesmapping;
import mth.models.RolesmappingId;

@Repository
public interface RolesmappingRepository extends JpaRepository<Rolesmapping, RolesmappingId> {
	
	@Modifying
	@Transactional
	@Query("delete from Rolesmapping R where R.role = :role")
	public void deleteByRole(@Param("role") Long role);
}
