// src/main/java/com/skillxchange/repository/SkillRepository.java
package com.skillxchange.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillxchange.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserId(Long userId);
}