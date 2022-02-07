package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RESTController {

    private UserService userService;

    @Autowired
    public RESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("token", "token value");
        return ResponseEntity.ok().headers(headers).body(userService.getAllUsers());
//    public List<User> getAllUsers() {
//        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user, @RequestParam(value = "checkRoles") String[] checkRoles) {
//    public User saveUser(@RequestBody User user) {
        user.setRoleSet(userService.getRolesByNames(checkRoles));
        userService.addUser(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.update(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        User tempUser = userService.getUserById(id);
        if (tempUser == null) {
            return "there is no user with id: " + id;
        }
        userService.deleteUserById(id);
        return "Deleted user with id: " + id;
    }
}
