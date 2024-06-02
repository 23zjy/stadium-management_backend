package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class User {
    private int user_id;
    private String username;
    private String password;
    private String email;
    private String phone;
}
