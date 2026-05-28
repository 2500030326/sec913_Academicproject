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

import mth.models.Source;
import mth.services.AdminService;
import mth.services.SourceService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin/sources")
public class SourceAdminController {

    @Autowired
    private SourceService sourceService;

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Source> listSources(@RequestHeader("Authorization") String authorization) throws Exception {
        adminService.requireAdmin(authorization);
        return sourceService.listAll();
    }

    @PostMapping
    public Source createSource(@RequestHeader("Authorization") String authorization, @RequestBody Source source)
            throws Exception {
        adminService.requireAdmin(authorization);
        return sourceService.createSource(source);
    }
}
