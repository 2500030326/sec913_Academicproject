package mth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.models.Article;
import mth.services.AdminService;
import mth.services.ArticleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin/articles")
public class ArticleAdminController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Article> listArticles(@RequestHeader("Authorization") String authorization) throws Exception {
        adminService.requireAdmin(authorization);
        return articleService.listAll();
    }

    @PostMapping
    public Article createArticle(@RequestHeader("Authorization") String authorization, @RequestBody Article article) throws Exception {
        adminService.requireAdmin(authorization);
        return articleService.createArticle(article);
    }

    @PutMapping("/{id}")
    public Article updateArticle(@RequestHeader("Authorization") String authorization, @PathVariable Long id,
            @RequestBody Article article) throws Exception {
        adminService.requireAdmin(authorization);
        return articleService.updateArticle(id, article);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@RequestHeader("Authorization") String authorization, @PathVariable Long id) throws Exception {
        adminService.requireAdmin(authorization);
        articleService.deleteArticle(id);
    }

    @PutMapping("/{id}/status")
    public Article updateStatus(@RequestHeader("Authorization") String authorization, @PathVariable Long id,
            @RequestBody Article article) throws Exception {
        adminService.requireAdmin(authorization);
        return articleService.updateStatus(id, article.getStatus());
    }
}
