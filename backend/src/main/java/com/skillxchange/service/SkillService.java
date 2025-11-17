// src/main/java/com/skillxchange/service/SkillService.java
package com.skillxchange.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillxchange.model.Skill;
import com.skillxchange.model.User;
import com.skillxchange.repository.SkillRepository;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserService userService;

    public Skill addSkill(Skill skill, String token) {
        User user = userService.getCurrentUser(token);
        skill.setUser(user);
        Skill savedSkill = skillRepository.save(skill);
        userService.updateMentorStatus(user);
        return savedSkill;
    }

    public List<Skill> getUserSkills(String token) {
        User user = userService.getCurrentUser(token);
        return skillRepository.findByUserId(user.getId());
    }
}