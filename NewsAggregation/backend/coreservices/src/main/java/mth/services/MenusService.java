package mth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Menus;
import mth.models.Users;
import mth.repository.MenusRepository;
import mth.repository.UsersRepository;

@Service
public class MenusService {
	
	@Autowired
	MenusRepository MR;
	
	@Autowired
	UsersRepository UR;
	
	@Autowired
	JwtService JWT;
	
	public Object addMenu(Map<String, Object> data, String token)
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
	        
	        String menuname = data.get("menuname").toString();
	        Menus M = new Menus();
	        M.setMenu(menuname);
	        M.setIcon("default.png"); // or something
	        
	        M = MR.save(M);
	        response.put("code", 200);
	        response.put("message", "Menu added successfully");
	        response.put("mid", M.getMid());
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object getMenus(String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			List<Menus> menus = MR.findAll();
			response.put("code", 200);
			response.put("menus", menus);
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
}