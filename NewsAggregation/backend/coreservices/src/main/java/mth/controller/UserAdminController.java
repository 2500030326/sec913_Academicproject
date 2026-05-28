package mth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.models.Users;
import mth.services.AdminService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin/users")
public class UserAdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Users> listUsers(@RequestHeader("Authorization") String authorization) throws Exception {
        return adminService.listUsers(authorization);
    }

    @PutMapping("/{id}/role")
    public Users assignRole(@RequestHeader("Authorization") String authorization, @PathVariable Long id,
            @RequestBody Map<String, Integer> payload) throws Exception {
        return adminService.updateUserRole(authorization, id, payload.getOrDefault("role", 1));
    }

    @PutMapping("/{id}/suspend")
    public Users suspendUser(@RequestHeader("Authorization") String authorization, @PathVariable Long id)
            throws Exception {
        return adminService.suspendUser(authorization, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@RequestHeader("Authorization") String authorization, @PathVariable Long id) throws Exception {
        adminService.deleteUser(authorization, id);
    }
}
