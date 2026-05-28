package mth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.services.RolesService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/roles")
public class RolesController {

	@Autowired
	RolesService RS;
	
	@PostMapping("")
	public Object addRole(@RequestBody Map<String, Object> data, @RequestHeader("Token") String token)
	{
		return RS.addRole(data, token);
	}
	
	@GetMapping("")
	public Object getRoles(@RequestHeader(value = "Token", required = false) String token)
	{
		return RS.getRoles(token);
	}
}
