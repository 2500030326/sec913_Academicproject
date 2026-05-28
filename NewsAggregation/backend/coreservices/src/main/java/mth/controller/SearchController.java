package mth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.models.Article;
import mth.services.AdminService;
import mth.services.ArticleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private AdminService adminService;

    @GetMapping("/trending")
    public List<Map<String, Object>> getTrendingSearches() {
        return adminService.getTrendingTopicsForPublic();
    }

    @PostMapping("/track")
    public Map<String, Object> trackSearch(@RequestBody Map<String, String> payload) {
        String keyword = payload.get("keyword");
        if (keyword != null && !keyword.isBlank()) {
            adminService.recordSearch(keyword);
        }
        return Map.of("status", "tracked", "keyword", keyword);
    }
}
