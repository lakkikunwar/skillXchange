// src/main/java/com/skillxchange/controller/SkillController.java
package com.skillxchange.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillxchange.model.Skill;
import com.skillxchange.service.SkillService;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Skill savedSkill = skillService.addSkill(skill, token);
        return ResponseEntity.ok(savedSkill);
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getUserSkills(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        List<Skill> skills = skillService.getUserSkills(token);
        return ResponseEntity.ok(skills);
    }
}