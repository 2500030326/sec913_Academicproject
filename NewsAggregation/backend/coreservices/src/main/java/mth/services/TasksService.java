package mth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Tasks;
import mth.models.Users;
import mth.models.Menus;
import mth.repository.TasksRepository;
import mth.repository.UsersRepository;

@Service
public class TasksService {
	
	@Autowired
	TasksRepository TR;
	
	@Autowired
	UsersRepository UR;
	
	@Autowired
	JwtService JWT;

	private boolean hasMenuAccess(Users U, String... menuNames)
	{
		if(U.getRole() == 3)
			return true;

		List<Object> menus = UR.getMenus(Long.valueOf(U.getRole()));
		for(Object menu : menus)
		{
			if(!(menu instanceof Menus))
				continue;

			String currentMenu = ((Menus) menu).getMenu();
			String normalizedCurrentMenu = currentMenu == null ? "" : currentMenu.replaceAll("\\s+", "").toLowerCase();
			for(String menuName : menuNames)
			{
				String normalizedMenuName = menuName.replaceAll("\\s+", "").toLowerCase();
				if(normalizedCurrentMenu.equals(normalizedMenuName))
					return true;
			}
		}
		return false;
	}
	
	public Object addTask(Map<String, Object> data, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			// Validate token
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        if(U.getRole() != 2 && !hasMenuAccess(U, "Task Manager", "ProjectManager", "Project Manager", "pro"))
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied. Task Manager or ProjectManager access is required.");
	        	return response;
	        }
	        
	        String taskName = data.get("task").toString();
        String description = data.get("description").toString();
        Long assignedto = data.get("assignedto") != null ? Long.valueOf(data.get("assignedto").toString()) : null;
        
        Tasks T = new Tasks();
        T.setTask(taskName);
        T.setDescription(description);
	        T.setAssignedto(assignedto);
	        if(data.containsKey("taskdate"))
	        	T.setTaskdate(data.get("taskdate").toString());
	        if(data.containsKey("taskhours"))
	        	T.setTaskhours(data.get("taskhours").toString());
	        if(data.containsKey("taskminutes"))
	        	T.setTaskminutes(data.get("taskminutes").toString());
	        T.setStatus(1); // Default status - active
	        
	        TR.save(T);
	        response.put("code", 200);
	        response.put("message", "Task added successfully");
	        response.put("id", T.getId());
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object deleteTask(Long taskId, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			// Validate token
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        if(U.getRole() != 2 && !hasMenuAccess(U, "Task Manager", "ProjectManager", "Project Manager", "pro"))
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied. Task Manager or ProjectManager access is required.");
	        	return response;
	        }
	        
	        if(!TR.existsById(taskId))
	        {
	        	response.put("code", 404);
	        	response.put("message", "Task not found");
	        	return response;
	        }
	        
	        TR.deleteById(taskId);
	        response.put("code", 200);
	        response.put("message", "Task deleted successfully");
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object listTasks(String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			// Validate token
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        List<Tasks> tasks = TR.findAllTasks();
	        
	        response.put("code", 200);
	        response.put("tasks", tasks);
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}

	public Object listMyTasks(String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        response.put("code", 200);
	        response.put("tasks", TR.findAssignedToUser(U.getId()));
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object getTaskById(Long taskId, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			// Validate token
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        if(!TR.existsById(taskId))
	        {
	        	response.put("code", 404);
	        	response.put("message", "Task not found");
	        	return response;
	        }
	        
	        Tasks T = TR.findById(taskId).get();
	        response.put("code", 200);
	        response.put("task", T);
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object updateTask(Long taskId, Map<String, Object> data, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			// Validate token
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        if(U.getRole() != 2 && !hasMenuAccess(U, "Task Manager", "ProjectManager", "Project Manager", "pro"))
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied. Task Manager or ProjectManager access is required.");
	        	return response;
	        }
	        
	        if(!TR.existsById(taskId))
	        {
	        	response.put("code", 404);
	        	response.put("message", "Task not found");
	        	return response;
	        }
	        
	        Tasks T = TR.findById(taskId).get();
	        
	        if(data.containsKey("task"))
	        	T.setTask(data.get("task").toString());
	        if(data.containsKey("description"))
	        	T.setDescription(data.get("description").toString());
	        if(data.containsKey("assignedto"))
	        	T.setAssignedto(Long.valueOf(data.get("assignedto").toString()));
	        if(data.containsKey("taskdate"))
	        	T.setTaskdate(data.get("taskdate").toString());
	        if(data.containsKey("taskhours"))
	        	T.setTaskhours(data.get("taskhours").toString());
	        if(data.containsKey("taskminutes"))
	        	T.setTaskminutes(data.get("taskminutes").toString());
	        if(data.containsKey("status"))
	        	T.setStatus(Integer.parseInt(data.get("status").toString()));
	        
	        TR.save(T);
	        response.put("code", 200);
	        response.put("message", "Task updated successfully");
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
}
