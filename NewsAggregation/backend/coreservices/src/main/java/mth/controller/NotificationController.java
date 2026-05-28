package mth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.models.Notification;
import mth.services.AdminService;
import mth.services.NotificationService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Notification> getNotifications(@RequestHeader("Authorization") String authorization) throws Exception {
        adminService.requireAdmin(authorization);
        return notificationService.listNotifications();
    }

    @PostMapping
    public Notification sendNotification(@RequestHeader("Authorization") String authorization,
            @RequestBody Notification notification) throws Exception {
        adminService.requireAdmin(authorization);
        return notificationService.createNotification(notification);
    }
}
