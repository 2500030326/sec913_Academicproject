package mth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.services.TasksService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tasks")
public class TasksController {

	@Autowired
	TasksService TS;
	
	@PostMapping("")
	public Object addTask(@RequestBody Map<String, Object> data, @RequestHeader("Token") String token)
	{
		return TS.addTask(data, token);
	}
	
	@DeleteMapping("/{id}")
	public Object deleteTask(@PathVariable Long id, @RequestHeader("Token") String token)
	{
		return TS.deleteTask(id, token);
	}
	
	@GetMapping("")
	public Object listTasks(@RequestHeader("Token") String token)
	{
		return TS.listTasks(token);
	}

	@GetMapping("/my")
	public Object listMyTasks(@RequestHeader("Token") String token)
	{
		return TS.listMyTasks(token);
	}
	
	@GetMapping("/{id}")
	public Object getTaskById(@PathVariable Long id, @RequestHeader("Token") String token)
	{
		return TS.getTaskById(id, token);
	}
	
	@PutMapping("/{id}")
	public Object updateTask(@PathVariable Long id, @RequestBody Map<String, Object> data, @RequestHeader("Token") String token)
	{
		return TS.updateTask(id, data, token);
	}
}
