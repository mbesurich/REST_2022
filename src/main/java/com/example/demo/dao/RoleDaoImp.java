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
        return (Role) em
                .createQuery("SELECT r FROM Role r WHERE r.name LIKE :role", Role.class)
                .setParameter("role", name)
                .getSingleResult();
    }

    @Override
    public Set<Role> getAllRoles() {
        return new HashSet<Role>(em.createQuery("SELECT r FROM Role r", Role.class).getResultList());
    }

    @Override
    public Set<Role> getRolesByNames(String[] names) {
        StringBuilder sb = new StringBuilder();
        String[] roles = new String[names.length];
        sb.append("SELECT r FROM Role r WHERE ");
        for (int i = 0; i < names.length; i++) {
            sb.append("r.name LIKE :role").append(i);
            if (i != names.length - 1) {
                sb.append(" OR ");
            }
        }
        TypedQuery<Role> query = em.createQuery(sb.toString(), Role.class);
        for (int i = 0; i < names.length; i++) {
            query.setParameter("role" + i, names[i]);
        }
        return new HashSet<>(query.getResultList());
    }

}
