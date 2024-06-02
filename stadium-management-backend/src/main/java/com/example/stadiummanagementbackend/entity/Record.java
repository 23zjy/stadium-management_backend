package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Record {
    private int record_id;
    private int member_id;
    private int user_id;
    private int product_id;
    private int quantity;
    private int total_price;
    private String record_date;
    private String record_time;
    private String payment_method;
}
