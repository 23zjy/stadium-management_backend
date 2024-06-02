package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Product {
    private int product_id;
    private String product_name;
    private int price;
    private int stock;
}
