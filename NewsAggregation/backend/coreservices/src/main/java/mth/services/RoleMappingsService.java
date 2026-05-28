package mth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Rolesmapping;
import mth.models.Users;
import mth.repository.RolesmappingRepository;
import mth.repository.UsersRepository;

@Service
public class RoleMappingsService {
	
	@Autowired
	RolesmappingRepository RMR;
	
	@Autowired
	UsersRepository UR;
	
	@Autowired
	JwtService JWT;
	
	public Object mapRoleMenus(Map<String, Object> data, String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			// Validate token and check if admin
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        if(U.getRole() != 3)
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied");
	        	return response;
	        }
	        
	        Long role = Long.valueOf(data.get("role").toString());
	        List<Integer> menuIds = (List<Integer>) data.get("menuIds");
	        
	        // First, delete existing mappings for this role
	        RMR.deleteByRole(role);
	        
	        // Then add new mappings
	        for(Integer mid : menuIds)
	        {
	        	Rolesmapping RM = new Rolesmapping();
	        	RM.setRole(role);
	        	RM.setMid(Long.valueOf(mid));
	        	RMR.save(RM);
	        }
	        
	        response.put("code", 200);
	        response.put("message", "Role menu mapping saved successfully");
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}

	public Object getRoleMappings(String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        if(U.getRole() != 3)
	        {
	        	response.put("code", 403);
	        	response.put("message", "Access denied");
	        	return response;
	        }
	        
	        response.put("code", 200);
	        response.put("mappings", RMR.findAll());
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
}
