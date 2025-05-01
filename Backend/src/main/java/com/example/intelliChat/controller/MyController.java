package com.example.intelliChat.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/getFiles")
    public String helloWorld() {
        return "Hello, World!";
    }
}