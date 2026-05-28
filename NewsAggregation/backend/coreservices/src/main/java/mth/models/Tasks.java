package mth.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Tasks {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	String task;
	String description;
	Long assignedto;
	String taskdate;
	String taskhours;
	String taskminutes;
	int status;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTask() {
		return task;
	}
	
	public void setTask(String task) {
		this.task = task;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Long getAssignedto() {
		return assignedto;
	}
	
	public void setAssignedto(Long assignedto) {
		this.assignedto = assignedto;
	}

	public String getTaskdate() {
		return taskdate;
	}

	public void setTaskdate(String taskdate) {
		this.taskdate = taskdate;
	}

	public String getTaskhours() {
		return taskhours;
	}

	public void setTaskhours(String taskhours) {
		this.taskhours = taskhours;
	}

	public String getTaskminutes() {
		return taskminutes;
	}

	public void setTaskminutes(String taskminutes) {
		this.taskminutes = taskminutes;
	}
	
	public int getStatus() {
		return status;
	}
	
	public void setStatus(int status) {
		this.status = status;
	}
}
