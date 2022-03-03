package com.example.demo.dao;

import com.example.demo.model.User;

import java.util.List;

public interface UserDao {
    void addUser(User user);
    void update(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    void deleteUserById(Long id);
    User getUserByEmail(String email);
    List<String> getAllEmails();
}
