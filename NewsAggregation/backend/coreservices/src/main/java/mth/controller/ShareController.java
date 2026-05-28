package mth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.models.Article;
import mth.models.Share;
import mth.models.Users;
import mth.repository.ArticleRepository;
import mth.repository.UsersRepository;
import mth.services.JwtService;
import mth.services.ShareService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/shares")
public class ShareController {

    @Autowired
    private ShareService shareService;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public Share recordShare(@RequestHeader(name = "Authorization", required = false) String authorization,
            @RequestBody Map<String, Object> payload) throws Exception {
        Long articleId = Long.valueOf(payload.get("articleId").toString());
        String platform = payload.get("platform").toString().toUpperCase();
        String email = null;

        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7);
            try {
                var claims = jwtService.validateJWT(token);
                email = (String) claims.get("username");
            } catch (Exception ignored) {
            }
        }

        Article article = articleRepository.findById(articleId).orElseThrow(() -> new RuntimeException("Article not found"));
        Share share = new Share();
        share.setArticle(article);
        share.setPlatform(platform);
        if (email != null) {
            Users user = usersRepository.findByEmail(email);
            share.setUser(user);
        }
        return shareService.recordShare(share);
    }

    @GetMapping("/summary")
    public Map<String, Object> getShareSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("sharePlatforms", shareService.getShareSummary());
        summary.put("whatsappShares", shareService.countByPlatform("WHATSAPP"));
        return summary;
    }
}
