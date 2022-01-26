package com.example.demo.controller;

import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@Controller
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String userStartPage(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        Set<Role> roles = user.getRoleSet();
        boolean isAdmin = false;
        for(Role role : roles) {
            if (role.getName().equalsIgnoreCase("ROLE_ADMIN")) {
                isAdmin = true;
            }
        }
        model.addAttribute("isAdmin", isAdmin);
        return "user";
    }
}
