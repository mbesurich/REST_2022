package com.example.demo.dao;

import org.springframework.stereotype.Repository;
import com.example.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserDaoImp implements UserDao{

    @PersistenceContext
    private EntityManager em;

    @Override
    public void addUser(User user) {
        em.persist(user);
    }

    @Override
    public void update(User user) {
        em.merge(user);
    }

    @Override
    public List<User> getAllUsers() {
        return em.createQuery("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.roleSet", User.class).getResultList();
    }

    @Override
    public User getUserById(Long id) {
        return em.find(User.class, id);
    }

    @Override
    public void deleteUserById(Long id) {
        em.remove(getUserById(id));
    }

    @Override
    public User getUserByEmail(String email) {
        return em
                .createQuery("SELECT u FROM User u WHERE u.email LIKE :email", User.class)
                .setParameter("email", email)
                .getSingleResult();
    }

    @Override
    public List<String> getAllEmails() {
        return em.createQuery("SELECT email FROM User", String.class).getResultList();
    }

}
