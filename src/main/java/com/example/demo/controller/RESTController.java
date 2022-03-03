package com.example.demo.controller;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        HttpHeaders headers = new HttpHeaders();
        User tempUser = userService.getUserById(id);
        if (tempUser == null) {
            return ResponseEntity.badRequest().headers(headers).body(tempUser);
        }
        return ResponseEntity.ok().headers(headers).body(tempUser);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        HttpHeaders headers = new HttpHeaders();
//        user.setRoleSet(userService.getRolesByNames(checkRoles));
       /* if (userService.getUserByEmail(user.getEmail()) != null) {
            System.out.println("userService.getUserByEmail(user.getEmail()) != null");
            return ResponseEntity.badRequest().headers(headers).body(user);
        }*/
        if (userService.getAllEmails().contains(user.getEmail())) {
            System.out.println("----------------Email is not unique -------------------------");
            return ResponseEntity.badRequest().headers(headers).body(user);
        }
        userService.addUser(user);
        return ResponseEntity.ok().headers(headers).body(user);
    }
//    public ResponseEntity<User> saveUser(@RequestBody User user, @RequestParam(value = "checkRoles") String[] checkRoles) {
//        HttpHeaders headers = new HttpHeaders();
//        user.setRoleSet(userService.getRolesByNames(checkRoles));
//        userService.addUser(user);
//        return ResponseEntity.ok().headers(headers).body(user);
//    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping(value = "/users")
    public ResponseEntity<User> edit(@RequestBody User user) {
        HttpHeaders headers = new HttpHeaders();
//        user.setRoleSet(userService.getRolesByNames(checkRoles));

        if (userService.getAllEmails().contains(user.getEmail())) {
            System.out.println("----------------Email is not unique -------------------------");
            return ResponseEntity.badRequest().headers(headers).body(user);
        }

        userService.update(user);
        return ResponseEntity.ok().headers(headers).body(user);
    }

/*    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping(value = "/users")
    public ResponseEntity<User> edit(@RequestBody User user, @RequestParam("checkRoles") String[] checkRoles) {
        HttpHeaders headers = new HttpHeaders();
        user.setRoleSet(userService.getRolesByNames(checkRoles));
        userService.update(user);
        return ResponseEntity.ok().headers(headers).body(user);
    }*/

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        HttpHeaders headers = new HttpHeaders();
        User tempUser = userService.getUserById(id);
        if (tempUser == null) {
            return ResponseEntity.badRequest().headers(headers).body("there is no user with id: " + id);
        }
        userService.deleteUserById(id);
        return ResponseEntity.ok().headers(headers).body("Deleted user with id: " + id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/roles")
    public Set<Role> getAllUsers(@RequestBody String[] roles) {
        return userService.getRolesByNames(roles);
    }
}
