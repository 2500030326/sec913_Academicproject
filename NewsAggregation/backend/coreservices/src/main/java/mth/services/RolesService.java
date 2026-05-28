package mth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Roles;
import mth.models.Users;
import mth.repository.RolesRepository;
import mth.repository.UsersRepository;

@Service
public class RolesService {
	
	@Autowired
	RolesRepository RR;
	
	@Autowired
	UsersRepository UR;
	
	@Autowired
	JwtService JWT;
	
	public Object addRole(Map<String, Object> data, String token)
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
	        
	        String rolename = data.get("rolename").toString();
	        Roles R = new Roles();
	        R.setRolename(rolename);
	        
	        R = RR.save(R);
	        response.put("code", 200);
	        response.put("message", "Role added successfully");
	        response.put("role", R.getRole());
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object getRoles(String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			List<Roles> roles = RR.findAll();
			response.put("code", 200);
			response.put("roles", roles);
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
}