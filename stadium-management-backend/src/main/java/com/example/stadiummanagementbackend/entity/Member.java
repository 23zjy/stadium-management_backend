package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Member {
    private int member_id;
    private String member_name;
    private String phone;
    private String created_at;
    private int remaining_balance;
    private int[] coupon_id;
}
