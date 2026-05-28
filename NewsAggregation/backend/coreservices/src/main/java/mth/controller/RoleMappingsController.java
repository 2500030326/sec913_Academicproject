package mth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.services.RoleMappingsService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/role-mappings")
public class RoleMappingsController {

	@Autowired
	RoleMappingsService RMS;
	
	@PostMapping("")
	public Object mapRoleMenus(@RequestBody Map<String, Object> data, @RequestHeader("Token") String token)
	{
		return RMS.mapRoleMenus(data, token);
	}

	@GetMapping("")
	public Object getRoleMappings(@RequestHeader("Token") String token)
	{
		return RMS.getRoleMappings(token);
	}
}
