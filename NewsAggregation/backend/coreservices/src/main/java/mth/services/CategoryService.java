package mth.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Category;
import mth.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> listAll() {
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) {
            seedDefaultCategories();
            categories = categoryRepository.findAll();
        }
        return categories;
    }

    public Category createCategory(Category category) {
        String name = category.getName() == null ? "" : category.getName().trim();
        if (name.isBlank()) {
            throw new IllegalArgumentException("Category name is required");
        }

        Category savedCategory = categoryRepository.findByNameIgnoreCase(name).orElseGet(Category::new);
        savedCategory.setName(name);
        savedCategory.setArticles(Math.max(category.getArticles(), savedCategory.getArticles()));
        savedCategory.setStatus(category.getStatus() == null || category.getStatus().isBlank() ? "Active" : category.getStatus());
        if (savedCategory.getCreatedAt() == null) {
            savedCategory.setCreatedAt(LocalDateTime.now());
        }
        savedCategory.setUpdatedAt(LocalDateTime.now());
        return categoryRepository.save(savedCategory);
    }

    private void seedDefaultCategories() {
        categoryRepository.save(createSeedCategory("Technology", 452, "Active"));
        categoryRepository.save(createSeedCategory("Sports", 318, "Active"));
        categoryRepository.save(createSeedCategory("Politics", 204, "Review"));
        categoryRepository.save(createSeedCategory("Business", 180, "Active"));
        categoryRepository.save(createSeedCategory("Health", 96, "Inactive"));
    }

    private Category createSeedCategory(String name, int articles, String status) {
        Category category = new Category();
        category.setName(name);
        category.setArticles(articles);
        category.setStatus(status);
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());
        return category;
    }
}
