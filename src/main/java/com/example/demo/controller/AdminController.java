package com.example.demo.controller;

import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.User;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String showAllUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        model.addAttribute("newUser", new User());
        model.addAttribute("allRoles", userService.getAllRoles());
        return "admin";
    }

    @PostMapping("/add")
    public String saveUser(@ModelAttribute("user") User user, @RequestParam(value = "checkRoles") String[] checkRoles) {
        user.setRoleSet(userService.getRolesByNames(checkRoles));
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PostMapping(value = "/edit")
    public String editUserPost(@ModelAttribute("user") User user, @RequestParam(value = "checkRoles") String[] checkRoles) {
        user.setRoleSet(userService.getRolesByNames(checkRoles));
        userService.update(user);
        return "redirect:/admin";
    }

    @RequestMapping("/delete")
    public String deleteUserForm(@RequestParam("id") long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }
}
