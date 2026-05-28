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

import mth.services.ProjectsService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/projects")
public class ProjectsController {

	@Autowired
	ProjectsService PS;
	
	@PostMapping("")
	public Object addProject(@RequestBody Map<String, Object> data, @RequestHeader("Token") String token)
	{
		return PS.addProject(data, token);
	}
	
	@GetMapping("")
	public Object listProjects(@RequestHeader("Token") String token)
	{
		return PS.listProjects(token);
	}
	
	@PutMapping("/{id}")
	public Object updateProject(@PathVariable Long id, @RequestBody Map<String, Object> data, @RequestHeader("Token") String token)
	{
		return PS.updateProject(id, data, token);
	}
	
	@DeleteMapping("/{id}")
	public Object deleteProject(@PathVariable Long id, @RequestHeader("Token") String token)
	{
		return PS.deleteProject(id, token);
	}
}
