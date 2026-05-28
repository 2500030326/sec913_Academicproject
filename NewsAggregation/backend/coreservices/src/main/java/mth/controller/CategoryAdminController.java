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

import mth.models.Category;
import mth.services.CategoryService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin/categories")
public class CategoryAdminController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> listCategories(@RequestHeader("Authorization") String authorization) throws Exception {
        return categoryService.listAll();
    }

    @PostMapping
    public Category createCategory(@RequestHeader("Authorization") String authorization, @RequestBody Category category)
            throws Exception {
        return categoryService.createCategory(category);
    }
}
