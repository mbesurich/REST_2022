package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/login")
public class LoginController {

    @GetMapping
    public String login (@RequestParam(value = "error", required = false) String error) {
        if (error != null) {
            return "error";
        } else {
            return "login";
        }
    }
}
