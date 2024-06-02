package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Coupon {
    private int coupon_id;
    private String coupon_name;
    private String description;
    private int discount;
}
