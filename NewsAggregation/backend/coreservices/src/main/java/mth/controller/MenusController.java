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

import mth.services.MenusService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/menus")
public class MenusController {

	@Autowired
	MenusService MS;
	
	@PostMapping("")
	public Object addMenu(@RequestBody Map<String, Object> data, @RequestHeader("Token") String token)
	{
		return MS.addMenu(data, token);
	}
	
	@GetMapping("")
	public Object getMenus(@RequestHeader("Token") String token)
	{
		return MS.getMenus(token);
	}
}