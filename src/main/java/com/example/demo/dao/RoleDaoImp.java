package com.example.demo.dao;

import org.springframework.stereotype.Repository;
import com.example.demo.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.HashSet;
import java.util.Set;

@Repository
public class RoleDaoImp implements RoleDao{

    @PersistenceContext
    private EntityManager em;

    @Override
    public Role getRoleByName(String name) {
        return em
                .createQuery("SELECT r FROM Role r WHERE r.name LIKE :role", Role.class)
                .setParameter("role", name)
                .getSingleResult();
    }

    @Override
    public Set<Role> getAllRoles() {
        return new HashSet<>(em.createQuery("SELECT r FROM Role r", Role.class).getResultList());
    }

    @Override
    public Set<Role> getRolesByNames(String[] names) {
        TypedQuery<Role> query = em.createQuery("SELECT r FROM Role r WHERE r.name in :names", Role.class);
        return new HashSet<>(query.getResultList());
    }

}
