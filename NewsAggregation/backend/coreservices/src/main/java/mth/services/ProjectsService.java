package mth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Menus;
import mth.models.Projects;
import mth.models.Users;
import mth.repository.ProjectsRepository;
import mth.repository.UsersRepository;

@Service
public class ProjectsService {
	
	@Autowired
	ProjectsRepository PR;
	
	@Autowired
	UsersRepository UR;
	
	@Autowired
	JwtService JWT;
	
	private Users getAuthenticatedUser(String token) throws Exception
	{
		Map<String, Object> payload = JWT.validateJWT(token);
        String email = (String) payload.get("username");
        return (Users) UR.findByEmail(email);
	}
	
	private boolean canManageProjects(Users U)
	{
		if(U.getRole() == 3)
			return true;
		
		List<Object> menus = UR.getMenus(Long.valueOf(U.getRole()));
		for(Object menu : menus)
		{
			if(menu instanceof Menus)
			{
				String menuName = ((Menus) menu).getMenu();
				String normalizedMenuName = menuName == null ? "" : menuName.replaceAll("\\s+", "").toLowerCase();
				if("projectmanager".equals(normalizedMenuName) || "project".equals(normalizedMenuName) || "pro".equals(normalizedMenuName))
					return true;
			}
		}
		return false;
	}
	
	public Object addProject(Map<String, Object> data, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Users U = getAuthenticatedUser(token);
			if(!canManageProjects(U))
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied. ProjectManager menu access is required.");
	        	return response;
	        }
			
			Projects P = new Projects();
			P.setProject(data.get("project").toString());
			P.setDescription(data.get("description").toString());
			if(data.get("mappedto") != null && !data.get("mappedto").toString().isEmpty())
				P.setMappedto(Long.valueOf(data.get("mappedto").toString()));
			P.setStatus(1);
			
			PR.save(P);
			response.put("code", 200);
			response.put("message", "Project added successfully");
			response.put("id", P.getId());
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object listProjects(String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Users U = getAuthenticatedUser(token);
			if(!canManageProjects(U))
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied. ProjectManager menu access is required.");
	        	return response;
	        }
			
			response.put("code", 200);
			response.put("projects", PR.findAll());
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object updateProject(Long projectId, Map<String, Object> data, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Users U = getAuthenticatedUser(token);
			if(!canManageProjects(U))
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied. ProjectManager menu access is required.");
	        	return response;
	        }
			
			if(!PR.existsById(projectId))
			{
				response.put("code", 404);
				response.put("message", "Project not found");
				return response;
			}
			
			Projects P = PR.findById(projectId).get();
			if(data.containsKey("project"))
				P.setProject(data.get("project").toString());
			if(data.containsKey("description"))
				P.setDescription(data.get("description").toString());
			if(data.containsKey("mappedto"))
				P.setMappedto(Long.valueOf(data.get("mappedto").toString()));
			if(data.containsKey("status"))
				P.setStatus(Integer.parseInt(data.get("status").toString()));
			
			PR.save(P);
			response.put("code", 200);
			response.put("message", "Project mapped successfully");
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object deleteProject(Long projectId, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Users U = getAuthenticatedUser(token);
			if(!canManageProjects(U))
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied. ProjectManager menu access is required.");
	        	return response;
	        }
			
			if(!PR.existsById(projectId))
			{
				response.put("code", 404);
				response.put("message", "Project not found");
				return response;
			}
			
			PR.deleteById(projectId);
			response.put("code", 200);
			response.put("message", "Project deleted successfully");
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
}
