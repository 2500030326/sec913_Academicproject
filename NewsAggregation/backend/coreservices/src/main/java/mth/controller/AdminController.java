package mth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.services.AdminService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public Object getDashboard(@RequestHeader("Authorization") String authorization) throws Exception {
        return adminService.getDashboardSummary(authorization);
    }

    @GetMapping("/analytics")
    public Object getAnalytics(@RequestHeader("Authorization") String authorization) throws Exception {
        return Map.of(
                "traffic", adminService.getDashboardSummary(authorization).get("dailyTrafficAnalytics"),
                "sentiment", adminService.getDashboardSummary(authorization).get("aiSentimentStats"));
    }

    @GetMapping("/trending")
    public Object getTrending(@RequestHeader("Authorization") String authorization) throws Exception {
        return adminService.getTrendingTopics(authorization);
    }

    @GetMapping("/share-analytics")
    public Object getShareAnalytics(@RequestHeader("Authorization") String authorization) throws Exception {
        return adminService.getShareAnalytics(authorization);
    }
}
